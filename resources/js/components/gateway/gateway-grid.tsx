import GatewayCard from "./gateway-card";
import { Gateway } from "./types";

interface Props {
    gateways: Gateway[];
}

export default function GatewayGrid({
    gateways,
}: Props) {

    return (

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

            {gateways.map((gateway) => (

                <GatewayCard
                    key={gateway.id}
                    gateway={gateway}
                />

            ))}

        </div>

    );

}