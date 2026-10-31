import { Suspense } from "react";

import { onBoard } from '@/features/auth/action/onboard';
import { auth } from '@clerk/nextjs/server';

async function AuthGate({ children }: { children: React.ReactNode }) {
    await auth.protect();
    await onBoard();  // TODO extra db call here, use web hooks instead

    return <>{children}</>;
}

const RootGroupLayout = async ({ children }: {
    children: React.ReactNode
}) => {
    // TODO make fallback to some skeleton
    return (
        <div>
            <Suspense fallback={null}>
                <AuthGate>
                    {children}
                </AuthGate>
            </Suspense>
        </div>
    )
}

export default RootGroupLayout;