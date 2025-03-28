'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/auth-actions';
import ShootingStars from "@/app/components/ShootingStars";

export default function Login() {
    const [errorMessage, formAction] = useActionState(
        authenticate,
        undefined,
    );

    return(
         <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <ShootingStars />
                <div className="text-center lg:text-left z-10" >
                    <h1 className="text-5xl font-bold">AM Service </h1>
                    <p className="py-6">
                        Ut desint vires, tamen laudanda est voluntas.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0  shadow-[0_0_5px_2px_rgba(255,255,255,0.5)]">
                    <form className="card-body" action={formAction} >
                        <div className="text-center lg:text-left z-10" >
                            <h1 className="text-2xl font-bold">Login</h1>
                        </div>
                        <div className="form-control">
                            <label
                                className="label"
                                htmlFor="email"
                            >
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered" required
                            />
                        </div>
                        <div className="form-control">
                            <label
                                className="label"
                                htmlFor="password"
                            >
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn ">Login</button>
                        </div>
                         {errorMessage && (
                             <>
                                 <p className="text-sm text-red-500">{errorMessage}</p>
                             </>
                         )}
                    </form>
                </div>
            </div>
         </div>
    )
}