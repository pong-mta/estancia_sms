@props(['url'])

<tr style="margin-bottom: 10px">
<td class="header" style="padding:40px 20px;background:#0f172a;text-align:center;">

    <a href="{{ $url }}" style="text-decoration:none;display:inline-block;">

        <div style="
            display:inline-block;
            padding:18px;
            background:#1e293b;
            border:1px solid #334155;
            border-radius:18px;
            margin-bottom:18px;
        ">

            <div style="
                font-size:40px;
                line-height:40px;
            ">
                💬
            </div>

            {{-- Replace / enable bottom code if used logo --}}
            {{-- <img
                src="{{ asset('images/logo.png') }}"
                alt="PONG-MTA"
                style="
                    width:80px;
                    height:80px;
                    margin-bottom:20px;
                "
            > --}}

        </div>

        <div style="
            font-size:32px;
            font-weight:800;
            color:#ffffff;
            letter-spacing:3px;
            font-family:Arial,Helvetica,sans-serif;
        ">
            PONG-MTA
        </div>

        <div style="
            margin-top:8px;
            font-size:13px;
            letter-spacing:6px;
            text-transform:uppercase;
            color:#22d3ee;
            font-family:Arial,Helvetica,sans-serif;
        ">
            SMS Gateway
        </div>

    </a>

</td>
</tr>