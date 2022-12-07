/* eslint-disable no-console */
/* eslint-disable no-undef */
import { useApolloClient } from "@apollo/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAccount } from "wagmi";
import { RootState } from "../app/store";
import { SubmitArticleModal } from "../components";
import Categories from "../components/Categories";
import { JODW_BACKEND as server } from "../constants";
import { CreatePostTypedDataDocument } from "@jodw/lens";
import { MetadataDisplayType } from "../lib/lens/interfaces/generic";
import { PublicationMainFocus } from "../lib/lens/interfaces/publication";
import { sendTransacton } from "../utils/arweave";
import { uploadIpfs } from "../utils/ipfs";

const SubmitState = {
  SUBMIT_REVIEW_PENDING: "SUBMIT_REVIEW_PENDING",
  SUBMIT_UNDER_REVIEW: "SUBMIT_UNDER_REVIEW",
  SUBMIT_REVIEW_COMPLETED: "SUBMIT_REVIEW_COMPLETED",
  SUBMIT_REVIEW_ERROR: "SUBMIT_REVIEW_ERROR",

  SUBMIT_CONTINUE_PENDING: "SUBMIT_CONTINUE_PENDING",
  SUBMIT_CONTINUE_ERROR: "SUBMIT_CONTINUE_ERROR",
  SUBMIT_CONTINUE_COMPLETED: "SUBMIT_CONTINUE_COMPLETED",
};

const SubmitLensPublication = () => {
  const apolloClient = useApolloClient();
  const props = useSelector((state: RootState) => {
    return {
      lensAuth: state.user.lensAuth,
    };
  });
  const { address } = useAccount();
  const [selectedManuscriptFile, setSelectedManuscriptFile] = useState(undefined);
  const [authors, setAuthors] = useState([]);
  const [selectedArticleCover, setSelectedArticleCover] = useState();
  const [talentPrice, setTalentPrice] = useState(0);
  const [articleTitle, setArticleTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [blockchain, setBlockchain] = useState("Ethereum");
  const [categories, setCategories] = useState([]);
  const [optionTech, setOptionTech] = useState(false);
  const [optionHistory, setOptionHistory] = useState(false);
  const [optionRomance, setOptionRomance] = useState(false);
  const [optionComedy, setOptionComedy] = useState(false);
  const [optionPolitics, setOptionPolitics] = useState(false);
  const [arweaveHash, setArweaveHash] = useState("");
  const [ipfsMetadataUri, setIpfsMetadataUri] = useState("");
  const [showSubmitArticleModal, setShowSubmitArticleModal] = useState(false);
  // const { walletId } = useParams();

  const [titleError, setTitleError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const [abstractError, setAbstractError] = useState(false);
  const [submitState, setSubmitState] = useState(SubmitState.SUBMIT_REVIEW_PENDING);

  // const clearForm = () => {
  //   setSelectedManuscriptFile(undefined);
  //   setAuthors([]);
  //   setSelectedArticleCover(undefined);
  //   setTalentPrice(0);
  //   setArticleTitle("");
  //   setAbstract("");
  //   setBlockchain("Polygon");
  //   setCategories([]);
  //   setOptionTech(false);
  //   setOptionHistory(false);
  //   setOptionRomance(false);
  //   setOptionComedy(false);
  //   setOptionPolitics(false);
  //   setIpfsMetadataUri("");
  //   setSubmitState(SubmitState.SUBMIT_REVIEW_PENDING);
  // };

  const createArticleMetadata = async (articleArweave: { id: any; contentType: any; }, coverImageArweave: { id: any; contentType: any; }, onSuccess: { (ipfsUri: any): Promise<void>; (arg0: string): void; }, onError: () => void) => {
    const ipfsResult = await uploadIpfs({
      version: "2.0.0",
      mainContentFocus: PublicationMainFocus.IMAGE,
      metadata_id: uuidv4(),
      description: abstract,
      locale: "en-US",
      external_url: "https://arweave.net/" + articleArweave?.id,
      image: null,
      imageMimeType: null,
      name: articleTitle,
      media: [
        {
          item: "https://arweave.net/" + coverImageArweave?.id,
          type: coverImageArweave?.contentType
        }
      ],
      attributes: [
        {
          displayType: MetadataDisplayType.Number,
          traitType: "price",
          value: talentPrice
        },
        {
          displayType: MetadataDisplayType.String,
          traitType: "authors",
          value: Array.isArray(authors) ? authors.join(",") : authors
        },
        {
          displayType: MetadataDisplayType.String,
          traitType: "chain",
          value: blockchain
        },
        {
          displayType: MetadataDisplayType.String,
          traitType: "categories",
          value: categories.join(",")
        },
        {
          displayType: MetadataDisplayType.String,
          traitType: "articleContentType",
          value: articleArweave?.contentType
        },
      ],
      tags: ["talentdao", "jodw"],
      appId: "talentdao",
    });
    console.log("IPFS metadata upload result: ", ipfsResult);
    onSuccess("ipfs://" + ipfsResult?.path);
    // onError();
  };

  const changeTalentPrice = (event: any) => {
    setTalentPrice(event.target.value);
  };

  const changeSelectedArticleCover = (event: any) => {
    setSelectedArticleCover(event.target.files[0]);
  };

  const changeArticleTitle = (event: any) => {
    setArticleTitle(event.target.value);
  };

  const toBase64 = (file: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const onSubmitReview = async () => {
    let isError = false;
    if (articleTitle === "") {
      setTitleError(true);
      isError = true;
    }
    if (authors.length === 0) {
      setAuthorError(true);
      isError = true;
    }
    if (abstract === "") {
      setAbstractError(true);
      isError = true;
    }

    if (isError) return;

    if (submitState === SubmitState.SUBMIT_REVIEW_PENDING) {
      setSubmitState(SubmitState.SUBMIT_UNDER_REVIEW);
    }
  };

  const continueSubmissionAfterConfirmation = async ({ article: articleData, lensProfile }: any) => {

    setSubmitState(SubmitState.SUBMIT_CONTINUE_PENDING);

    const articleFile = articleData?.manuscriptFile
      ? {
        filename: articleData?.manuscriptFile?.name,
        data: articleData?.manuscriptFile ? await toBase64(articleData?.manuscriptFile?.data) : "",
      }
      : {
        filename: "",
        data: "",
      };

    const articleCover = articleData?.coverImage
      ? {
        filename: articleData?.coverImage?.name,
        data: articleData?.coverImage ? await toBase64(articleData?.coverImage?.data) : "",
      }
      : {
        filename: "",
        data: "",
      };

    // todo: move this out of the view and add to redux features
    // set up Arweave tx
    const { result: arweaveTx, contentType: articleContentType } = await submitToArweave(articleFile);
    const { result: coverImageArweaveTx, contentType: coverImageContentType } = await submitToArweave(articleCover);

    // set up onchain tx
    const articleArweave = { id: arweaveTx?.id, contentType: articleContentType };
    const coverImageArweave = { id: coverImageArweaveTx?.id, contentType: coverImageContentType };
    createArticleMetadata(articleArweave, coverImageArweave, async (ipfsUri: string) => {
      try {
        const res = await axios.post(server + "/api/article", {
          ...articleData,
          walletId: address,
          body: articleFile,
          cover: articleCover,
          arweaveHash: arweaveTx.id.toString(),
          lensCompatibleIpfsMetadata: ipfsUri,
        });
        console.log(res);
        if (res.status === 200) {
          setArweaveHash(articleArweave?.id);
          setIpfsMetadataUri(ipfsUri);
          publishToLensProfile(ipfsUri, lensProfile);
        }
      } catch (e) {
        console.error("Save article to JoDW backend failed: ", e);
      }
    }, () => { });
  };

  const publishToLensProfile = async (ipfsUri: string, lensProfile: { id: any; }) => {
    if (!lensProfile?.id) {
      console.warn("Lens profile not connected/available, skipping lens publish!");
      return;
    }
    try {
      const results = await apolloClient.mutate({
        mutation: CreatePostTypedDataDocument,
        variables: {
          request: {
            profileId: lensProfile.id,
            contentURI: ipfsUri,
            collectModule: {}
          }
        },
        context: {
          headers: {
            "x-access-token": props.lensAuth?.accessToken ? `Bearer ${props.lensAuth?.accessToken}` : "",
          },
        }
      });
      console.log("LENS PUBLISH RESULTS ", results);
    } catch (error) {
      console.error("Unable to publish to lens: ", error);
    }
  };

  // todo: move this out of the view and add to redux features
  const submitToArweave = async (file: { filename?: any; data: any; }) => {
    //
    const fileData = file.data;
    const contentType = fileData.substring(5, fileData.indexOf(";", 5));
    const result = await sendTransacton(fileData.substring(fileData.indexOf(",") + 1), contentType, categories);
    console.log("Result: ", result);
    console.log("Tx Id: ", result.id);

    return { result, contentType };
  };

  useEffect(() => {
    if (!selectedArticleCover) return;
    var src = URL.createObjectURL(selectedArticleCover);
    var preview = document.getElementById("preview");
    preview.src = src;
    preview.style.display = "block";
  }, [selectedArticleCover]);

  const articleFormData = {
    title: articleTitle,
    abstract: abstract,
    manuscriptFile: {
      name: selectedManuscriptFile?.name,
      data: selectedManuscriptFile
    },
    coverImage: {
      name: selectedArticleCover?.name,
      data: selectedArticleCover
    },
    price: talentPrice,
    authors: authors,
    blockchain: blockchain,
    categories: [
      optionTech && "Technology",
      optionComedy && "Comedy",
      optionHistory && "History",
      optionPolitics && "Politics",
      optionRomance && "Romance",
    ].filter(_c => _c),
  };

  const onSubmitSuccess = (result: { article: any; lensProfile: any; }) => {
    console.log("SUBMIT success: ", result);
    continueSubmissionAfterConfirmation(result);
  };

  const onSubmitError = (error: any) => {
    console.error("Error submitting: ", error);
    setSubmitState(SubmitState.SUBMIT_REVIEW_ERROR);
  };

  // For debugging:
  useEffect(() => {
    console.log("SUBMIT STATE: ", submitState);
  }, [submitState]);

  return (
    <div className="" style={{ backgroundImage: "linear-gradient(#fff, #EEEE" }}>
      <div className="m-4 p-4 max-w-screen-lg lg:max-w-screen-xl mx-auto">
        <div>
          <h2 className="text-4xl font-bold text-left">Submit Publication</h2>
          <p className="text-left">
            Upload image and details to the Journal of Decentralized Work
          </p>
          {/* todo: add a hover info tooltip here to explain where we save the data */}
        </div>

        <div className="flex">
          <div className="flex-1 space-y-6">
            <div className="space-y-6">
              <div className="py-5 sm:rounded-lg">
                <div className="md:grid md:grid-cols-10 md:gap-6">
                  <div className="mt-5 md:mt-0 md:col-span-6 flex flex-col place-content-between">
                    {/* todo: update this to be an option for the user but lets default to text input only for mvp */}
                    {/* <label className="block text-left text-lg font-bold text-gray-700">Article Manuscript</label>
                    <div className="mt-1 h-full flex flex-col justify-center items-center px-6 pt-5 pb-6 border border-gray-300 rounded-md">
                      {selectedManuscriptFile ? (
                        <div className="py-5 text-lg text-textgrey">{selectedManuscriptFile.name}</div>
                      ) : (
                        <div className="py-5 text-lg text-textgrey">File formats: pdf, md, doc, docx, txt.</div>
                      )}
                      <label
                        htmlFor="manuscript-upload"
                        className="w-56 py-2 font-bold text-sm text-primary rounded-full cursor-pointer"
                        style={{ backgroundColor: "#FFD6DA" }}
                      >
                        <span>Choose File</span>
                        <input
                          accept=".pdf, .md, .doc, .docx, .txt"
                          id="manuscript-upload"
                          name="manuscript-upload"
                          type="file"
                          className="sr-only"
                          onChange={changeSelectedManuscriptFile}
                        />
                      </label>
                    </div> */}
                    <div className="mt-1 h-full flex flex-col justify-center items-center px-6 pt-5 pb-6 border border-gray-300 rounded-md">
                      {selectedArticleCover ? (
                        <div className="py-5 text-lg text-textgrey">{selectedArticleCover.name}</div>
                      ) : (
                        <div className="py-5 text-lg text-textgrey">Cover Image formats: jpg, jpeg, png.</div>
                      )}
                      <label
                        htmlFor="articlecover-upload"
                        className="w-56 py-2 font-bold text-sm text-primary rounded-full cursor-pointer"
                        style={{ backgroundColor: "#FFD6DA" }}
                      >
                        <span>Choose Image</span>
                        <input
                          accept=".jpg, .jpeg, .png"
                          id="articlecover-upload"
                          name="articlecover-upload"
                          type="file"
                          className="sr-only"
                          onChange={changeSelectedArticleCover}
                        />
                      </label>
                    </div>
                    <div className="mt-2">
                      <label className="block text-left text-lg font-bold">Peer Bounty</label>
                      <p className="text-left">The amount you are willing to spend on your peer review</p>
                      <div className="flex flex-row items-end border-b border-black ">
                        <input
                          type="number"
                          name="price"
                          id="price"
                          className="mt-1 mb-0 p-2 bg-transparent block w-full shadow-sm focus:outline-none text-lg"
                          value={talentPrice}
                          onChange={changeTalentPrice}
                        />
                        <div className="pb-2 ml-1 text-textgrey text-lg">$TALENT</div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:col-span-4 md:flex flex-col">
                    <h3 className="text-left text-lg font-bold leading-6 text-gray-900 -mt-5">Preview</h3>
                    <div className="my-0 border border-gray-300 rounded-md w-full h-full flex items-center justify-center text-center">
                      {selectedArticleCover ? (
                        <img alt="preview" id="preview"></img>
                      ) : (
                        <p>Upload image to preview your publication image</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-10 col-span-6">
                  <label htmlFor="article-title" className="pl-4 block text-left text-lg font-bold">
                    Title <span className="pl-1 text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    name="article-title"
                    id="article-title"
                    placeholder="e.g Decentralised finance"
                    value={articleTitle}
                    onChange={changeArticleTitle}
                    className="my-1 p-4 bg-transparent rounded-xl block w-full focus:outline-none text-lg border border-black"
                  />
                  {titleError && (
                    <div
                      className=" border border-primary text-primary px-4 py-3 text-left rounded-lg relative"
                      role="alert"
                    >
                      <span className="block sm:inline">You must input Title.</span>
                      <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setTitleError(false)}>
                        <svg
                          className="fill-current h-6 w-6 text-red-500"
                          role="button"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <title>Close</title>
                          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>
                {/* todo: we don't need the author either, we are defaulting to the signed in user for mvp */}
                {/* <div className="mt-10 col-span-6">
                  <label htmlFor="article-title" className="pl-4 block text-left text-lg font-bold">
                    Author(s) <span className="pl-1 text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    name="article-title"
                    id="article-title"
                    placeholder="e.g John Doe"
                    value={authors}
                    onChange={e => setAuthors([e.target.value])}
                    className="my-1 p-4 bg-transparent rounded-xl block w-full focus:outline-none text-lg border border-black "
                  />
                  {authorError && (
                    <div
                      className=" border border-primary text-primary px-4 py-3 text-left rounded-lg relative"
                      role="alert"
                    >
                      <span className="block sm:inline">You must input Authors.</span>
                      <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setAuthorError(false)}>
                        <svg
                          className="fill-current h-6 w-6 text-red-500"
                          role="button"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <title>Close</title>
                          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                      </span>
                    </div>
                  )}
                </div> */}
                <div className="mt-10 col-span-6 h-[200px]">
                  <div className="pl-4 flex flex-col text-left">
                    <label htmlFor="abstract" className="block text-left text-lg font-bold">
                      Publication Content <span className="pl-1 text-primary">*</span>
                    </label>
                    {/* <p className="">
                      Each submission should have exactly one abstract. Submissions with multiple articles will be
                      disqualified from the marketplace.
                    </p> */}
                  </div>
                  <div className="mt-1">
                    <textarea
                      rows={4}
                      name="abstract"
                      id="abstract"
                      value={abstract}
                      onChange={e => setAbstract(e.target.value)}
                      className="p-4 block w-full bg-transparent text-lg rounded-xl focus:outline-none border border-black"
                    />
                  </div>
                  {abstractError && (
                    <div
                      className="mt-1 border border-primary text-primary px-4 py-3 text-left rounded-lg relative"
                      role="alert"
                      style={{ backgroundColor: "#fff5f5" }}
                    >
                      <span className="block sm:inline">You must input Abstract.</span>
                      <span
                        className="absolute top-0 bottom-0 right-0 px-4 py-3"
                        onClick={() => setAbstractError(false)}
                      >
                        <svg
                          className="fill-current h-6 w-6 text-red-500"
                          role="button"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <title>Close</title>
                          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>

                {/* We are defaulting to polygon for mvp */}
                {/* <div className="mt-10 col-span-6">
                  <label htmlFor="select-blockchain" className="pl-4 block text-left text-lg font-bold">
                    Select Blockchain <span className="pl-4 text-primary">*</span>
                  </label>
                  <select
                    id="select-blockchain"
                    name="select-blockchain"
                    onChange={e => changeBlockchain(e)}
                    className="mt-1 block bg-transparent w-full pl-3 pr-10 py-2 text-lg rounded-xl border border-black"
                  >
                    <option disabled>Ethereum</option>
                    <option>Polygon</option>
                  </select>
                </div> */}
                {/* todo: are we going to use these for mvp ?? */}
                <Categories />
              </div>
              <div className="flex justify-center justify-items-center">
                {(submitState === SubmitState.SUBMIT_REVIEW_PENDING || submitState === SubmitState.SUBMIT_REVIEW_ERROR) &&
                  <button
                    type="button"
                    onClick={() => {
                      setShowSubmitArticleModal(true);
                      onSubmitReview();
                    }}
                    disabled={(() => submitState !== SubmitState.SUBMIT_REVIEW_PENDING)()}
                    className="bg-primary text-white py-2 px-6 rounded-full text-lg"
                  >
                    SUBMIT
                  </button>
                }
                {submitState === SubmitState.SUBMIT_CONTINUE_PENDING &&
                  <button type="button" className="bg-primary text-white py-2 px-6 rounded-full text-lg" disabled>
                    <svg className="inline animate-spin h-5 w-5 mr-3 text-center" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </button>
                }
                <SubmitArticleModal
                  article={articleFormData}
                  isOpen={showSubmitArticleModal}
                  onSuccess={onSubmitSuccess}
                  onSubmitError={onSubmitError}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitLensPublication;
