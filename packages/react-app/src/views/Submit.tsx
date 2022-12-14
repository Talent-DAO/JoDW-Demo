import { useApolloClient } from "@apollo/client";
import { notification } from "antd";
import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  useAccount,
  useNetwork,
} from "wagmi";
import { SubmitArticleModal } from "../components";
import { JODW_BACKEND } from "../constants";
import TalentDaoContracts from "../contracts/hardhat_contracts.json";
import { RootState } from "../app/store";
import {
  useCreatePostViaDispatcherMutation,
  useCreatePostTypedDataMutation,
} from "@jodw/lens";
import { MetadataDisplayType, PublicationMainFocus } from "../lib";
import { sendTransacton } from "../utils/arweave";
import { uploadIpfs } from "../utils/ipfs";
import onError from "../lib/shared/onError";
import { broadcastTypedData } from "../lib/lens/publications/post";

const server = JODW_BACKEND;

const SubmitState = {
  SUBMIT_REVIEW_PENDING: "SUBMIT_REVIEW_PENDING",
  SUBMIT_UNDER_REVIEW: "SUBMIT_UNDER_REVIEW",
  SUBMIT_REVIEW_COMPLETED: "SUBMIT_REVIEW_COMPLETED",
  SUBMIT_REVIEW_ERROR: "SUBMIT_REVIEW_ERROR",

  SUBMIT_CONTINUE_PENDING: "SUBMIT_CONTINUE_PENDING",
  SUBMIT_CONTINUE_ERROR: "SUBMIT_CONTINUE_ERROR",
  SUBMIT_CONTINUE_COMPLETED: "SUBMIT_CONTINUE_COMPLETED",
};

const Submit = () => {
  const dispatch = useDispatch();
  const apolloClient = useApolloClient();
  const { address } = useAccount();
  const { chain } = useNetwork();
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
  const { walletId } = useParams();

  const [titleError, setTitleError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const [abstractError, setAbstractError] = useState(false);
  const [submitState, setSubmitState] = useState(SubmitState.SUBMIT_REVIEW_PENDING);

  const clearForm = () => {
    setSelectedManuscriptFile(undefined);
    setAuthors([]);
    setSelectedArticleCover(undefined);
    setTalentPrice(0);
    setArticleTitle("");
    setAbstract("");
    setBlockchain("Polygon");
    setCategories([]);
    setOptionTech(false);
    setOptionHistory(false);
    setOptionRomance(false);
    setOptionComedy(false);
    setOptionPolitics(false);
    setIpfsMetadataUri("");
    setSubmitState(SubmitState.SUBMIT_REVIEW_PENDING);
  };

  const [createPostTypedData] = useCreatePostTypedDataMutation({
    onCompleted: ({ createPostTypedData }) => broadcastTypedData(createPostTypedData, () => {
      clearForm();
      notification.open({
        message: "Article submission successful!",
        description: "You have submitted your article== 😍",
        icon: "🚀",
      });
      console.log(["Article published!"]);
    }, false), // TODO: make this true. RN it does not complete...
    onError: (error) => {
      onError({
        message: "Submit failed!",
        details: "Something went wrong while submitting the article, please try again. Details: " + error?.message
      });
      setSubmitState(SubmitState.SUBMIT_CONTINUE_ERROR);
    }
  });

  const [createArticleViaDispatcher] = useCreatePostViaDispatcherMutation({
    onCompleted: (data) => {
      clearForm();
      if (data.createPostViaDispatcher.__typename === "RelayerResult") {
        notification.open({
          message: "Article submission successful!",
          description: "You have submitted your article== 😍",
          icon: "🚀",
        });
        setSubmitState(SubmitState.SUBMIT_CONTINUE_COMPLETED); // temporary, remove once onchain submit is reenabled
      }
    },
    onError
  });

  const createViaDispatcher = async (request: any) => {
    const { data } = await createArticleViaDispatcher({ variables: { request } });
    if (data?.createPostViaDispatcher?.__typename === "RelayError") {
      createPostTypedData({ variables: { request } });
    }
  };


  // todo: we are only using on polygon, so we can remove this
  // const talentDaoManagerContract = Object.entries(TalentDaoContracts[chain?.id] || {}).find(([_key, _value]) => _value?.chainId === String(chain?.id))?.[1]?.contracts?.TalentDaoManager;

  // const { config: talentDaoManagerContractConfig } = usePrepareContractWrite({
  //   addressOrName: talentDaoManagerContract?.address,
  //   contractInterface: talentDaoManagerContract?.abi,
  //   functionName: "mintArticleNFT",
  //   args: [address, arweaveHash, ipfsMetadataUri, !Number.isNaN(talentPrice) ? ethers.utils.parseEther("0") : ethers.utils.parseEther(String(talentPrice))],
  //   onError(_err) {
  //     if (_err) {
  //       setSubmitState(SubmitState.SUBMIT_CONTINUE_ERROR);
  //       console.error("On chain tx failed", _err);
  //       notification.open({
  //         message: "Submit failed!",
  //         description: "Something went wrong while submitting the article, please try again.",
  //         icon: "⚠️",
  //       });
  //     }
  //   },
  // });
  // const {
  //   data: onChainSubmitData,
  //   write: doSubmitOnChain,
  // } = useContractWrite(talentDaoManagerContractConfig);
  // 
  // const waitForOnChainTransaction = useWaitForTransaction({
  //   hash: onChainSubmitData?.hash,
  //   timeout: 10_000,
  //   onSettled(_data, _error) {
  //     if (_data?.status === 1) {
  //       notification.open({
  //         message: "Article is now onchain",
  //         description: "You have submitted your article== 😍",
  //         icon: "🚀",
  //       });
  //       setSubmitState(SubmitState.SUBMIT_CONTINUE_COMPLETED);
  //       clearForm();
  //     } else {
  //       setSubmitState(SubmitState.SUBMIT_CONTINUE_ERROR);
  //     }
  //   },
  // });

  const changeSelectedManuscriptFile = (event: any) => {
    setSelectedManuscriptFile(event.target.files[0]);
  };

  const changeTalentPrice = (event: any) => {
    setTalentPrice(event.target.value);
  };

  const changeBlockchain = (e: any) => {
    setBlockchain(e.target.value);
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

    // set up Arweave tx
    const { result: arweaveTx, contentType: articleContentType } = await submitToArweave(articleFile);
    const { result: coverImageArweaveTx, contentType: coverImageContentType } = await submitToArweave(articleCover);

    // set up onchain tx
    const articleArweave = { id: arweaveTx?.id, contentType: articleContentType };
    const coverImageArweave = { id: coverImageArweaveTx?.id, contentType: coverImageContentType };
    createArticleMetadata(articleArweave, coverImageArweave, async (ipfsUri: string) => {
      try {
        // const res = await axios.post(server + "/api/article", {
        //   ...articleData,
        //   walletId: walletId,
        //   body: articleFile,
        //   cover: articleCover,
        //   arweaveHash: arweaveTx.id.toString(),
        //   lensCompatibleIpfsMetadata: ipfsUri,
        // });
        // console.log(res);
        // if (res.status === 200) {
        setArweaveHash(articleArweave?.id);
        setIpfsMetadataUri(ipfsUri);
        publishToLensProfile(ipfsUri, lensProfile);
        //}
      } catch (e) {
        console.error("Save article to JoDW backend failed: ", e);
      }
    }, () => {});
  };

  const publishToLensProfile = async (ipfsUri: string, lensProfile: { id: any; }) => {
    if (!lensProfile?.id) {
      console.warn("Lens profile not connected/available, skipping lens publish!");
      return;
    }
    try {
      const request = {
        profileId: lensProfile?.id,
        contentURI: ipfsUri,
        collectModule: { freeCollectModule: { followerOnly: false } },
        referenceModule: { followerOnlyReferenceModule: false },
      };
      await createViaDispatcher(request);
    } catch (error) {
      console.error("Unable to publish to lens: ", error);
    }
  };

  useEffect(() => {
    if (submitState !== SubmitState.SUBMIT_CONTINUE_PENDING) {
      return;
    }

    if (arweaveHash !== "" && ipfsMetadataUri !== ""/* && doSubmitOnChain*/) {
      //doSubmitOnChain?.();
    }
  }, [ipfsMetadataUri/*, doSubmitOnChain*/]);

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
      name: "#jodw " + articleTitle,
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
          value: talentPrice.toString()
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
          value: articleFormData?.categories.join(",")
        },
        {
          displayType: MetadataDisplayType.String,
          traitType: "articleContentType",
          value: articleArweave?.contentType
        },
        {
          displayType: MetadataDisplayType.String,
          traitType: "articleContentURI",
          value: "https://arweave.net/" + articleArweave?.id
        },
      ],
      tags: ["talentdao", "jodw"],
      appId: "JoDW",
    });
    console.log("IPFS metadata upload result: ", ipfsResult);
    onSuccess("ipfs://" + ipfsResult?.path);
    // onError();
  };

  // For debugging:
  // useEffect(() => {
  //   console.log("SUBMIT STATE: ", submitState);
  // }, [submitState]);

  return (
    <div className="" style={{ backgroundImage: "linear-gradient(#fff, #EEEE" }}>
      <div className="m-4 p-4 max-w-screen-lg lg:max-w-screen-xl mx-auto">
        <div>
          <h2 className="text-4xl font-bold text-left">Submit Article</h2>
          <p className="text-left">
            Upload your article manuscript and related details to the Journal of Decentralized Work.
          </p>
        </div>

        <div className="flex">
          <div className="flex-1 space-y-6">
            <div className="space-y-6">
              <div className="py-5 sm:rounded-lg">
                <div className="md:grid md:grid-cols-10 md:gap-6">
                  <div className="mt-5 md:mt-0 md:col-span-6 flex flex-col place-content-between">
                    <label className="block text-left text-lg font-bold text-gray-700">Article Manuscript</label>
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
                    </div>
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
                      <label className="block text-left text-lg font-bold">Price</label>
                      <div className="flex flex-row items-end border-b border-black ">
                        <input
                          type="number"
                          name="price"
                          id="price"
                          className="mt-1 mb-0 p-2 bg-transparent block w-full shadow-sm focus:outline-none text-lg"
                          value={talentPrice}
                          onChange={changeTalentPrice}
                        />
                        <div className="pb-2 text-textgrey text-lg">$TALENT</div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:col-span-4 md:flex flex-col">
                    <h3 className="text-left text-lg font-bold leading-6 text-gray-900">Preview</h3>
                    <div className="my-0 border border-gray-300 rounded-md w-full h-full flex items-center justify-center text-center">
                      {selectedArticleCover ? (
                        <img alt="preview" id="preview"></img>
                      ) : (
                        <p>Upload image to preview your article image</p>
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
                <div className="mt-10 col-span-6">
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
                </div>
                {/* <div className="mt-10 col-span-6">
                <label htmlFor="authors" className="block text-left text-sm font-medium text-gray-700">
                  Author(s)
                </label>
                <AuthorForm
                  register={register}
                  control={control}
                  handleSubmit={handleSubmit}
                  reset={reset}
                  formState={formState}
                  watch={watch}
                />
              </div> */}
                <div className="mt-10 col-span-6">
                  <div className="pl-4 flex flex-col text-left">
                    <label htmlFor="abstract" className="block text-left text-lg font-bold">
                      Abstract <span className="pl-1 text-primary">*</span>
                    </label>
                    <p>
                      Each submission should have exactly one abstract. Submissions with multiple articles will be
                      disqualified from the marketplace.
                    </p>
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

                <div className="mt-10 col-span-6">
                  <label htmlFor="select-blockchain" className="pl-4 block text-left text-lg font-bold">
                    Select Blockchain <span className="pl-4 text-primary">*</span>
                  </label>
                  <select
                    id="select-blockchain"
                    name="select-blockchain"
                    onChange={e => changeBlockchain(e)}
                    className="mt-1 block bg-transparent w-full pl-3 pr-10 py-2 text-lg rounded-xl border border-black"
                  >
                    <option>Ethereum</option>
                    <option>Polygon</option>
                    <option>Optimism</option>
                  </select>
                </div>

                <div className="mt-10 col-span-6">
                  <div className="pl-4 flex flex-col">
                    <label htmlFor="categories" className="block text-left text-lg font-bold">
                      Categories
                    </label>
                    <p className="text-left">Select the category this article might belong to</p>
                  </div>
                  <div className="mt-1 w-full p-4 text-lg rounded-lg border flex flex-row flex-wrap items-center space-x-4">
                    <div
                      className={
                        optionTech
                          ? "my-2 px-4 py-2 rounded-full text-lg text-primary border border-primary cursor-pointer font-bold flex flex-row items-center"
                          : "my-2 px-4 py-2 rounded-full text-lg border cursor-pointer flex flex-row items-center"
                      }
                      style={
                        optionTech ? { backgroundColor: "rgba(180, 28, 46, 0.13)" } : { backgroundColor: "transparent" }
                      }
                      onClick={() => setOptionTech(!optionTech)}
                    >
                      {optionTech && (
                        <svg
                          className="mr-2"
                          width="20"
                          height="16"
                          viewBox="0 0 20 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.36364 12.3657L1.59091 7.66418L0 9.23134L6.36364 15.5L20 2.06716L18.4091 0.5L6.36364 12.3657Z"
                            fill="#B41C2E"
                          />
                        </svg>
                      )}
                      <div>Technology</div>
                    </div>
                    <div
                      className={
                        optionHistory
                          ? "my-2 px-4 py-2 rounded-full text-lg text-primary border border-primary cursor-pointer font-bold flex flex-row items-center"
                          : "my-2 px-4 py-2 rounded-full text-lg border cursor-pointer flex flex-row items-center"
                      }
                      style={
                        optionHistory
                          ? { backgroundColor: "rgba(180, 28, 46, 0.13)" }
                          : { backgroundColor: "transparent" }
                      }
                      onClick={() => setOptionHistory(!optionHistory)}
                    >
                      {optionHistory && (
                        <svg
                          className="mr-2"
                          width="20"
                          height="16"
                          viewBox="0 0 20 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.36364 12.3657L1.59091 7.66418L0 9.23134L6.36364 15.5L20 2.06716L18.4091 0.5L6.36364 12.3657Z"
                            fill="#B41C2E"
                          />
                        </svg>
                      )}
                      <div>History</div>
                    </div>
                    <div
                      className={
                        optionRomance
                          ? "my-2 px-4 py-2 rounded-full text-lg text-primary border border-primary cursor-pointer font-bold flex flex-row items-center"
                          : "my-2 px-4 py-2 rounded-full text-lg border cursor-pointer flex flex-row items-center"
                      }
                      style={
                        optionRomance
                          ? { backgroundColor: "rgba(180, 28, 46, 0.13)" }
                          : { backgroundColor: "transparent" }
                      }
                      onClick={() => setOptionRomance(!optionRomance)}
                    >
                      {optionRomance && (
                        <svg
                          className="mr-2"
                          width="20"
                          height="16"
                          viewBox="0 0 20 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.36364 12.3657L1.59091 7.66418L0 9.23134L6.36364 15.5L20 2.06716L18.4091 0.5L6.36364 12.3657Z"
                            fill="#B41C2E"
                          />
                        </svg>
                      )}
                      <div>Romance</div>
                    </div>
                    <div
                      className={
                        optionComedy
                          ? "my-2 px-4 py-2 rounded-full text-lg text-primary border border-primary cursor-pointer font-bold flex flex-row items-center"
                          : "my-2 px-4 py-2 rounded-full text-lg border cursor-pointer flex flex-row items-center"
                      }
                      style={
                        optionComedy
                          ? { backgroundColor: "rgba(180, 28, 46, 0.13)" }
                          : { backgroundColor: "transparent" }
                      }
                      onClick={() => setOptionComedy(!optionComedy)}
                    >
                      {optionComedy && (
                        <svg
                          className="mr-2"
                          width="20"
                          height="16"
                          viewBox="0 0 20 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.36364 12.3657L1.59091 7.66418L0 9.23134L6.36364 15.5L20 2.06716L18.4091 0.5L6.36364 12.3657Z"
                            fill="#B41C2E"
                          />
                        </svg>
                      )}
                      <div>Comedy</div>
                    </div>
                    <div
                      className={
                        optionPolitics
                          ? "my-2 px-4 py-2 rounded-full text-lg text-primary border border-primary cursor-pointer font-bold flex flex-row items-center"
                          : "my-2 px-4 py-2 rounded-full text-lg border cursor-pointer flex flex-row items-center"
                      }
                      style={
                        optionPolitics
                          ? { backgroundColor: "rgba(180, 28, 46, 0.13)" }
                          : { backgroundColor: "transparent" }
                      }
                      onClick={() => setOptionPolitics(!optionPolitics)}
                    >
                      {optionPolitics && (
                        <svg
                          className="mr-2"
                          width="20"
                          height="16"
                          viewBox="0 0 20 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.36364 12.3657L1.59091 7.66418L0 9.23134L6.36364 15.5L20 2.06716L18.4091 0.5L6.36364 12.3657Z"
                            fill="#B41C2E"
                          />
                        </svg>
                      )}
                      <div>Politics</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center justify-items-center">
                {(submitState === SubmitState.SUBMIT_REVIEW_PENDING || submitState === SubmitState.SUBMIT_REVIEW_ERROR) &&
                  <button
                    type="button"
                    onClick={onSubmitReview}
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
                  isOpen={(() => submitState === SubmitState.SUBMIT_UNDER_REVIEW)()}
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

export default Submit;
