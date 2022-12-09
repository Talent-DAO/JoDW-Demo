import { useState } from "react";
import { Switch } from "@headlessui/react";
import PrimaryButton from "../../../components/dashboard/PrimaryButton";
import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SubmitView = () => {
  const [peerReviewEnabled, setPeerReviewEnabled] = useState(false);
  return (
    <div className="px-4 py-24 m-6 rounded-lg bg-white grid grid-cols-1 md:grid-cols-7">
      <div className="col-span-2"></div>
      <div className="col-span-1 md:col-span-3 space-y-6">
        <div>
          <div className="font-bold text-xl font-mont">Submit your publification</div>
          <div className="font-mont">Upload your masterpiece</div>
        </div>
        <div>
          <div className="mt-1 sm:mt-0">
            <div className="flex justify-center rounded-xl border-2 border-dashed border-gray px-6 py-24">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-primary"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">File formats: pdf, md, doc, docx, txt</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="font-bold text-xl font-mont">Post details</div>
          <div className="font-mont">Cross check these details</div>
        </div>
        <div>
          <label for="price" class="block text-sm">
            Price
          </label>
          <div class="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="price"
              id="price"
              class="block w-full rounded-md border-bordergrey border-2 pr-20 sm:text-sm"
              placeholder="0.00"
              aria-describedby="price-currency"
            />
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span class="sm:text-sm" id="price-currency">
                $TALENT
              </span>
            </div>
          </div>
        </div>
        <div>
          <label for="title" class="block text-sm">
            Title
          </label>
          <div class="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="title"
              id="title"
              class="block w-full rounded-md border-bordergrey border-2 sm:text-sm"
              placeholder="e.g Decentralised finance"
            />
          </div>
        </div>
        <div>
          <label for="author" class="block text-sm">
            Author(s)
          </label>
          <div class="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="author"
              id="author"
              class="block w-full rounded-md border-bordergrey border-2 sm:text-sm"
              placeholder="e.g @israelrex"
            />
          </div>
        </div>
        <div>
          <label for="description" class="block text-sm">
            Description
          </label>
          <div class="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="description"
              id="description"
              class="block w-full rounded-md border-bordergrey border-2 sm:text-sm"
              placeholder="e.g Decentralised finance"
            />
          </div>
        </div>
        <div>
          <label for="blockchain" class="block">
            Blockchain
          </label>
          <select
            id="blockchain"
            name="blockchain"
            class="mt-1 block w-full rounded-md border-bordergrey border-2 sm:text-sm"
          >
            <option>Ethereum</option>
            <option selected="">Polygon</option>
            <option>Binance</option>
          </select>
        </div>
        <div>
          <label for="category" class="block text-sm">
            Category
          </label>
          <div class="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="category"
              id="category"
              class="block w-full rounded-md border-bordergrey border-2 sm:text-sm "
              placeholder="Add tag"
            />
          </div>
        </div>
        <div className="flex flex-row">
          <label for="category" class="block text-sm mr-8">
            Submit for Peer Review
          </label>
          <Switch
            checked={peerReviewEnabled}
            onChange={setPeerReviewEnabled}
            className={classNames(
              peerReviewEnabled ? "bg-primary" : "bg-gray",
              "relative inline-flex h-6 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            )}
          >
            <span className="sr-only">Peer Review</span>
            <span
              aria-hidden="true"
              className={classNames(
                peerReviewEnabled ? "translate-x-8" : "translate-x-0",
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
              )}
            />
          </Switch>
        </div>
        <div>
          <PrimaryButton text="Submit" onClick={() => {}} Icon={ArrowUpTrayIcon} />
        </div>
      </div>
    </div>
  );
};

export default SubmitView;
