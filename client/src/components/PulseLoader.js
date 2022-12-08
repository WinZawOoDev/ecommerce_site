import React from 'react'

export default function PulseLoader() {
    return (
        <div className='container mx-auto'>
            <div className="border border-gray-200 rounded p-4 max-w-5xl w-full mx-auto my-5">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-200 h-16 w-16"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-200 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-200  rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border border-gray-200  rounded p-4 max-w-5xl w-full mx-auto my-5">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-200 h-16 w-16"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-200 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border border-gray-200 rounded p-4 max-w-5xl w-full mx-auto my-5">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-200 h-16 w-16"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-200 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
