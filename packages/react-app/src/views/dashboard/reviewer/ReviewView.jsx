import { useState } from "react";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/20/solid";
import { StarIcon as StarIconOutline, CheckBadgeIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const pubs = [
  { name: "Meta verse", category: ["DeSci", "History", "Art"], isFavourite: true, published: true, reviews: 8 },
  { name: "Blockchain", category: ["DeSci", "History", "Art"], isFavourite: false, published: false, reviews: 8 },
  { name: "NFT games", category: ["DeSci", "History", "Art"], isFavourite: true, published: false, reviews: 8 },
  { name: "Wonderland", category: ["DeSci", "History", "Art"], isFavourite: false, published: true, reviews: 0 },
  { name: "My article", category: ["DeSci", "History", "Art"], isFavourite: true, published: false, reviews: 56 },
  {
    name: "Nothing to be cleared",
    category: ["Defi", "History", "Art"],
    isFavourite: true,
    published: true,
    reviews: 7,
  },
];

const ReviewView = () => {
  return (
    <div className="m-6 bg-white p-6 rounded-lg">
      <div className="flex flex-row justify-between items-center">
        <div>
          <div className="text-xl font-bold font-mont">Review a Publification</div>
          <div className="">Pick your interest to review</div>
        </div>
        <div className="flex flex-row items-center space-x-1 text-primary cursor-pointer">
          <ArrowUpTrayIcon className="w-4 h-4" />
          <span>Reviewed Publifications</span>
        </div>
      </div>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <div className="p-4 border-b border-bordergrey flex flex-row justify-start items-center space-x-4">
          <div className="relative mt-1 rounded-lg w-full md:w-1/3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-black" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-md border-2 border-bordergrey pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search by article title"
            />
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <input id="favourite" aria-describedby="favourite" name="favourite" type="checkbox" class="h-4 w-4 rounded border-textgrey text-primary focus:ring-bgred" />
            <span>Favourite</span>
          </div>
        </div>
        <table className="min-w-full divide-y divide-bordergrey">
          <thead className="bg-bggrey">
            <tr className="bg-bggrey">
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textgrey sm:pl-6">
                PUBLIFICATIONS
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-textgrey lg:table-cell"
              >
                CATEGORY
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-textgrey sm:table-cell"
              >
                MY FAVOURITE
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-textgrey">
                PUBLISH
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-textgrey">
                REVIEWS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bordergrey bg-white">
            {pubs.map((pub, index) => (
              <tr key={index}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-textgrey sm:w-auto sm:max-w-none sm:pl-6">
                  <div className="flex flex-row space-x-1 items-center">
                    <span className="cursor-pointer text-darkblack">{pub.name}</span>
                    <div className="truncate text-textgrey sm:hidden">
                      {pub.isFavourite ? (
                        <StarIcon className="w-4 h-4 text-primary" />
                      ) : (
                        <StarIconOutline className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">CATEGORY</dt>
                    <dd className="mt-1 truncate text-textgrey md:hidden">
                      <div className="flex flex-row space-x-1">
                        {pub.category.map(item => {
                          if (item == "DeSci") {
                            return <div className="px-2 rounded-xl bg-bgred text-primary">{item}</div>;
                          }
                          if (item == "History") {
                            return <div className="px-2 rounded-xl bg-bgblue text-blue">{item}</div>;
                          }
                          if (item == "Art") {
                            return <div className="px-2 rounded-xl bg-bgpurple text-purple">{item}</div>;
                          }
                          return null;
                        })}
                      </div>
                    </dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-textgrey lg:table-cell">
                  <div className="flex flex-row space-x-1">
                    {pub.category.map(item => {
                      if (item == "DeSci") {
                        return <div className="px-2 rounded-xl bg-bgred text-primary">{item}</div>;
                      }
                      if (item == "History") {
                        return <div className="px-2 rounded-xl bg-bgblue text-blue">{item}</div>;
                      }
                      if (item == "Art") {
                        return <div className="px-2 rounded-xl bg-bgpurple text-purple">{item}</div>;
                      }
                      return null;
                    })}
                  </div>
                </td>
                <td className="hidden px-3 py-4 text-sm text-textgrey sm:table-cell">
                  {pub.isFavourite ? <StarIcon className="w-6 h-6 text-primary" /> : <StarIconOutline className="w-6 h-6" />}
                </td>
                <td className="px-3 py-4 text-sm text-textgrey">
                  {pub.published ? (
                    <div className="flex flex-row space-x-1 items-center">
                      <CheckBadgeIcon className="w-4 h-4" />
                      <span>Published</span>
                    </div>
                  ) : (
                    <div className="text-primary flex flex-row space-x-1 items-center cursor-pointer">
                      <ArrowUpTrayIcon className="w-4 h-4" />
                      <span>Publish</span>
                    </div>
                  )}
                </td>
                <td className="px-3 py-4 text-sm text-textgrey">{pub.reviews}&nbsp;Reviews</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="w-full py-4 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-6 text-darkgrey font-semibold">
                Page 1 of 10
              </td>
              <td className="hidden lg:table-cell"></td>
              <td className="hidden sm:table-cell"></td>
              <td className="hidden sm:table-cell"></td>
              <td className="w-full py-4 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-6 text-darkgrey font-semibold flex flex-row space-x-2 justify-center">
                <a className="p-2 rounded-xl border-2 border-bordergrey">Previous</a>
                <a className="p-2 rounded-xl border-2 border-bordergrey">Next</a>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ReviewView;
