<!DOCTYPE html>
<html>

<head>
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        table,
        th,
        td {
            border: 1px solid black;
        }

        th,
        td {
            padding: 8px;
            text-align: left;
        }

        .total {
            text-align: right;
        }

        img.qr {
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <h1>Invoice #{{ $invoice['id'] ?? 'INV123' }}</h1>
    <p><strong>Customer:</strong> {{ $invoice['customerName'] }}</p>
    <p><strong>Notes:</strong> {{ $invoice['notes'] }}</p>

    <table>
        <thead>
            <tr>
                <th>Item</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice['items'] as $item)
            <tr>
                <td>{{ $item['name'] }}</td>
                <td>${{ $item['price'] }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <h3 class="total">Total: ${{ $invoice['total'] }}</h3>

    <p>Scan QR to view invoice online:</p>
    @if(!empty($qrCodeBase64))
    <img class="qr" src="{{ $qrCodeBase64 }}" width="150" height="150" />
    @else
    <p>[QR code not available]</p>
    @endif
</body>

</html>