<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use App\Models\PaymentDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PaymentController extends Controller
{


    public function index()
    {
        $payments = Payment::with('paymentDetails.product', 'user')->where('user_id', auth()->id())->get();
        // dd($payments->toArray());
        return Inertia::render('Payment', ['payments' => $payments]);
    }

    public function generateRandomId($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return time() . $randomString;
    }


    public function store(Request $request)
    {

        try {
            DB::beginTransaction();
            $randomPaymentId = random_int(100000, 999999);

            $payment = Payment::create([
                'id' => $randomPaymentId,
                'user_id' => auth()->id(),
                'total_harga' => $request->totalHarga,

            ]);

            foreach ($request->orders as $order) {
                foreach ($order['order_details'] as $detail) {
                    PaymentDetail::create([
                        'payment_id' => $payment->id,
                        'product_id' => $detail['product_id'],
                        'name' => $request->name,
                        'email' => $request->email,
                        'phone' => $request->phone,
                        'alamat' => $request->alamat,

                        'size' => $detail['size'],
                        'quantity' => $detail['quantity'],
                        'harga' => $detail['harga']
                    ]);
                }
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
        }

        $snapToken = null;
        if (!$snapToken) {
            \Midtrans\Config::$serverKey = config('midtrans.serverKey');
            \Midtrans\Config::$isProduction = false;
            \Midtrans\Config::$isSanitized = true;
            \Midtrans\Config::$is3ds = true;

            // $pengiriman = Pengiriman::where('cart_id', $cartId)->value('hargaongkir');


            $params = [
                'transaction_details' => [
                    'order_id' => $payment->id,
                    'gross_amount' => $payment->total_harga, // Gunakan totalPrice dari semua item checkout
                ],
            ];
            $snapToken = \Midtrans\Snap::getSnapToken($params);
        }
        $payment->snap_token = $snapToken;
        $payment->save();
        Order::where('user_id', auth()->id())->delete();

        return redirect()->route('pembayaran');
    }

    public function updateStatus(Request $request)
    {
        $paymentId = $request->payment_id;
        $status = $request->status;  // contoh status: 'success', 'pending', atau 'failed'

        $payment = Payment::find($paymentId);
        if ($payment) {
            $payment->status = $status;
            $payment->snap_token = null;
            $payment->save();
            return response()->json(['message' => 'Payment status updated successfully.']);
        }

        return response()->json(['message' => 'Payment not found.'], 404);
    }
}
