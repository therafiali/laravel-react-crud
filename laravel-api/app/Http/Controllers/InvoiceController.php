<?php

namespace App\Http\Controllers;

use DateTime;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    // Generate and save invoice PDF
    public function generateInvoice(Request $request)
    {
        $data = $request->all();
        $invoiceId = $data['id'] ?? (new \DateTime())->format('YmdHis');

        // URL where invoice can be viewed
        $invoiceUrl = url("/api/invoice/{$invoiceId}/view");

        // Generate QR code as base64
        try {
            $qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' . urlencode($invoiceUrl);
            $qrImage = file_get_contents($qrUrl);
            if (!$qrImage) {
                $qrImage = ''; // fallback
            }
            $qrCodeBase64 = 'data:image/png;base64,' . base64_encode($qrImage);
        } catch (\Exception $e) {
            $qrCodeBase64 = ''; // fallback if API fails
        }

        // Load PDF view
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('invoice_template', [
            'invoice' => $data,
            'qrCodeBase64' => $qrCodeBase64
        ]);

        // Save PDF
        $pdfPath = "/invoices/invoice_{$invoiceId}.pdf";
        \Illuminate\Support\Facades\Storage::put($pdfPath, $pdf->output());

        return response()->json([
            'invoiceUrl' => url("storage/invoices/invoice_{$invoiceId}.pdf")
        ]);
    }


    // Serve invoice PDF via API
    public function viewInvoice($id)
    {
        // Match the path where PDF was saved
        $path = storage_path("app/public/invoices/invoice_{$id}.pdf");

        if (!file_exists($path)) {
            return response()->json(['error' => 'Invoice not found'], 404);
        }

        return response()->file($path);
    }
}
