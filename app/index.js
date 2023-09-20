import { Redirect } from "expo-router";

export function Index() {
    return <Redirect href="/login" />;
}

export default Index;