import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export const alt = "About ManySats";
export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col justify-center bg-white items-center">
        <h1 tw="mb-2 mt-4 flex items-center justify-center p-4 text-9xl">
          {/* @ts-expect-error svg does not know tailwind syntax */}
          <svg tw="w-24 h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f7931a" data-v-4fa90e7f="">
            <path d="M11.283 10.967l-.05-.015.528-2.117.212.05c.706.157 2.225.498 1.95 1.613-.295 1.173-2.049.646-2.64.469zM10.37 14.405l.086.025c.728.217 2.796.832 3.076-.333.289-1.121-1.57-1.558-2.402-1.753-.091-.022-.17-.04-.232-.056l-.528 2.117z"></path>
            <path
              fill-rule="evenodd"
              d="M12 21a9 9 0 100-18 9 9 0 000 18zm3.873-10.384c.206-1.302-.693-1.98-1.94-2.438l.438-1.77-.99-.246-.427 1.726-.193-.05c-.196-.05-.389-.1-.587-.144l.428-1.725-1.017-.252-.428 1.725-2.018-.5-.292 1.18s.749.163.721.179c.4.108.469.392.447.609l-.509 2.007-.698 2.823c-.055.134-.19.326-.464.26.012.012-.728-.191-.728-.191l-.486 1.245 1.958.534-.436 1.761.983.244.437-1.762c.158.046.318.083.473.119.116.027.229.053.336.082l-.437 1.761.985.244.437-1.761c1.695.323 2.975.172 3.547-1.497.46-1.33.03-2.09-.863-2.589.67-.163 1.167-.627 1.323-1.574z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span tw="ml-2">ManySats</span>
        </h1>
        <h2 tw="mb-8 p-8 text-center text-7xl italic text-blue-600">Your simple Fiat to Satoshi Converter</h2>
      </div>
    ),
    {
      ...size,
    },
  );
}
