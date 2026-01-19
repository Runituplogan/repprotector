export default function GlowBig() {
    return (
        <svg width="1440" height="1071" viewBox="0 0 1440 1071" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.2" filter="url(#filter0_fn_492_473)">
                <path d="M379.073 199.57C-82.7732 235.484 -736.123 603.812 -736.123 603.812C-736.123 603.812 18.5513 633.407 379.073 928.012C739.595 1222.62 1399.59 1273.98 1811.07 895.054C2034.1 689.668 2156.12 199.57 2156.12 199.57C2156.12 199.57 1886.23 427.439 1677.89 499.556C1185.96 669.846 898.08 159.211 379.073 199.57Z" fill="#9046E5" />
            </g>
            <defs>
                <filter id="filter0_fn_492_473" x="-933.411" y="-1.52588e-05" width="3286.82" height="1361.44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="98.6441" result="effect1_foregroundBlur_492_473" />
                    <feTurbulence type="fractalNoise" baseFrequency="2.1778943538665771 2.1778943538665771" stitchTiles="stitch" numOctaves="3" result="noise" seed="3840" />
                    <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                    <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                    </feComponentTransfer>
                    <feComposite operator="in" in2="effect1_foregroundBlur_492_473" in="coloredNoise1" result="noise1Clipped" />
                    <feFlood floodColor="rgba(0, 0, 0, 0.5)" result="color1Flood" />
                    <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                    <feMerge result="effect2_noise_492_473">
                        <feMergeNode in="effect1_foregroundBlur_492_473" />
                        <feMergeNode in="color1" />
                    </feMerge>
                </filter>
            </defs>
        </svg>

    )
}
