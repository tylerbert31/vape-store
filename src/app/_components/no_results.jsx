export default function NoResults() {
  return (
    <div className=" m-16 min-h-80 md:min-h-96 flex flex-row justify-center items-center text-center col-span-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-10 h-10"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <h3 className=" mx-3 mt-2"> No Results</h3>
    </div>
  );
}
