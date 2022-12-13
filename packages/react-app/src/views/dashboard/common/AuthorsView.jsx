import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Squares2X2Icon, TableCellsIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import AuthorCard from "../../../components/dashboard/AuthorCard";

const authors = [
  { name: "Olivia Rhye", description: "Front-end Developer", noOfPub: 200, category: ["DeSci", "History", "Art"] },
  { name: "Olivia Rhye", description: "Front-end Developer", noOfPub: 200, category: ["DeSci", "History", "Art"] },
  { name: "Olivia Rhye", description: "Front-end Developer", noOfPub: 200, category: ["DeSci", "History", "Art"] },
];

const AuthorsView = () => {
  const [viewMode, setViewMode] = useState("table");

  return (
    <div className="m-6 bg-white p-6">
      <div>
        <div className="text-xl font-bold font-mont">Authors List</div>
        <div className="">Here you will find the list of all verified authors</div>
      </div>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <div className="p-4 border-b border-bordergrey flex flex-row justify-between items-center space-x-4">
          <div className="relative mt-1 rounded-lg w-full md:w-1/3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-black" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-md border-2 border-bordergrey pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search by author name"
            />
          </div>
          <div className="flex flex-row space-x-2">
            <div
              className={`${viewMode === "table" ? "text-bordergrey" : "text-textgrey"} cursor-pointer`}
              onClick={() => setViewMode("list")}
            >
              <Squares2X2Icon className="w-10 h-10" />
            </div>
            <div
              className={`${viewMode === "table" ? "text-textgrey" : "text-bordergrey"} cursor-pointer`}
              onClick={() => setViewMode("table")}
            >
              <TableCellsIcon className="w-10 h-10" />
            </div>
          </div>
        </div>
        {viewMode === "table" ? (
          <table className="min-w-full divide-y divide-bordergrey">
            <thead className="bg-bggrey">
              <tr className="bg-bggrey">
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textgrey sm:pl-6">
                  AUTHORS
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-textgrey lg:table-cell"
                >
                  DESCRIPTION
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-textgrey sm:table-cell"
                >
                  NO OF PUBLIFICATIONS
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-textgrey">
                  CATEGORY
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-textgrey">
                  ACTION
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bordergrey bg-white">
              {authors.map(author => (
                <tr key={author.email}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-textgrey sm:w-auto sm:max-w-none sm:pl-6">
                    {author.name}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">DESCRIPTION</dt>
                      <dd className="mt-1 truncate text-gray-700">{author.description}</dd>
                      <dt className="sr-only sm:hidden">NO OF PUBLIFICATION </dt>
                      <dd className="mt-1 truncate text-textgrey sm:hidden">{author.noOfPub}</dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-textgrey lg:table-cell">{author.description}</td>
                  <td className="hidden px-3 py-4 text-sm text-textgrey sm:table-cell">{author.noOfPub}</td>
                  <td className="hidden px-3 py-4 text-sm text-textgrey lg:table-cell">
                    <div class="flex flex-row space-x-1">
                      {author.category.map(item => {
                        if (item === "DeSci") {
                          return <div class="px-2 rounded-xl bg-bgred text-primary">{item}</div>;
                        }
                        if (item === "History") {
                          return <div class="px-2 rounded-xl bg-bgblue text-blue">{item}</div>;
                        }
                        if (item === "Art") {
                          return <div class="px-2 rounded-xl bg-bgpurple text-purple">{item}</div>;
                        }
                        return null;
                      })}
                    </div>
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex justify-center">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                      <EllipsisVerticalIcon className="w-5 h-5" />
                    </a>
                  </td>
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-8 p-4">
            <AuthorCard></AuthorCard>
            <AuthorCard></AuthorCard>
            <AuthorCard></AuthorCard>
            <AuthorCard></AuthorCard>
            <AuthorCard></AuthorCard>
            <AuthorCard></AuthorCard>
            <AuthorCard></AuthorCard>
            <AuthorCard></AuthorCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorsView;
