import { Button } from '@mui/material'
import Link from 'next/link'

export default function NotFound() {
    return (
        <section className="flex items-center h-screen w-full">
            <div className="flex flex-col items-center justify-center w-full mb-20">
                <div className="flex flex-col gap-6 max-w-md text-center">
                    <h2 className="font-extrabold text-9xl">
                        <span className="sr-only">
                            Error
                        </span>
                        404
                    </h2>
                    <Link href={"/"}>
                        <Button>
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )  
}