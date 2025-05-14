import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Training One" },
        { name: "description", content: "Welcome to Training One!" },
    ];
}
export function loader({ context }: Route.LoaderArgs) {
    const cfContext = context as {
        cloudflare: { env: { VALUE_FROM_CLOUDFLARE: string } };
    };
    return { message: cfContext.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    return <Welcome message={loaderData.message} />;
}
