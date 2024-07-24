export default function AuthLayout({children}: { children: React.ReactNode}) {
    return (
        <div className="h-full items-center flex  justify-center">
            
            {children}
        </div>
    )
}