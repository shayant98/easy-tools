"use client";

import Container from "@components/Container/Container";
import BaseLayout from "@layout/BaseLayout";
import MultiEditorLayout from "@layout/multi-editor-layout";
import { useCallback, useEffect, useState } from "react";
import Editor from "@components/Editor/Editor";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/Input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@components/ui/select";
import { html } from "@codemirror/lang-html";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown";
import { toast } from "sonner";
import { ChevronDown, ClipboardCopy } from "lucide-react";
import Image from "next/image";
import { cn } from "@utils/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { ResetIcon } from "@radix-ui/react-icons";

type OGMeta = {
  title: string;
  description: string;
  url: string;
  type: string;
  cardType: string;
  siteAccount: string;
  creatorAccount: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tag?: string;
  isbn?: string;
  releaseDate?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
};

const Page = () => {
  const [output, setOutput] = useState("");
  const [info, setInfo] = useState<OGMeta>({
    title: "",
    description: "",
    url: "",
    type: "website",
    cardType: "summary",
    siteAccount: "",
    creatorAccount: "",
    publishedTime: "",
    modifiedTime: "",
    author: "",
    section: "",
    tag: "",
    isbn: "",
    releaseDate: "",
    firstName: "",
    lastName: "",
    username: "",
    gender: "",
  });

  useEffect(() => {
    setOutput(generateOpenGraphTags(info));

    return () => {
      setOutput("");
    };
  }, [info]);

  const copyHtml = useCallback(async () => {
    await navigator.clipboard.writeText(output);
    toast.success("Copied HTML");
  }, [output]);

  const copyNextJsMetadata = useCallback(async () => {
    const nextFile = `
      import type { Metadata } from 'next'

      const metadata: Metadata = {
        ${info.title ? `title: '${info.title}',` : ""}
        ${info.description ? `description: '${info.description}',` : ""}
        ${info.url ? `url: '${info.url}',` : ""}
        ${info.type ? `type: '${info.type}',` : ""}
        twitter: {
          ${info.cardType ? `card: '${info.cardType}',` : ""}
          ${info.siteAccount ? `site: '${info.siteAccount}',` : ""}
          ${info.creatorAccount ? `creator: '${info.creatorAccount}',` : ""}
        },
        ${info.publishedTime ? `publishedTime: '${info.publishedTime}',` : ""}
        ${info.modifiedTime ? `modifiedTime: '${info.modifiedTime}',` : ""}
        ${info.author ? `author: '${info.author}',` : ""}
        ${info.section ? `section: '${info.section}',` : ""}
        ${info.tag ? `tag: '${info.tag}',` : ""}
        ${info.isbn ? `isbn: '${info.isbn}',` : ""}
      }
    `;

    await navigator.clipboard.writeText(nextFile);
    toast.success("Copied NextJS Metadata");
  }, [
    info.title,
    info.description,
    info.url,
    info.type,
    info.cardType,
    info.siteAccount,
    info.creatorAccount,
    info.publishedTime,
    info.modifiedTime,
    info.author,
    info.section,
    info.tag,
    info.isbn,
  ]);

  const setInfoValue = useCallback((key: keyof OGMeta, value: string) => {
    setInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  return (
    <BaseLayout
      title="Open Graph Generator"
      desc="A tool to generate Open Graph images for your website."
      toolId={15}
    >
      <ToolButtons
        first={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <ClipboardCopy className="mr-2 h-5 w-5" />
                Copy
                <ChevronDown className={cn("ml-2 h-5 w-5")} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={async () => {
                  await copyHtml();
                }}
              >
                Copy HTML
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await copyNextJsMetadata();
                }}
              >
                Copy NextJS
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
        second={
          <Button
            variant={"ghost"}
            onClick={() => {
              setInfo({
                title: "",
                description: "",
                url: "",
                type: "website",
                cardType: "summary",
                siteAccount: "",
                creatorAccount: "",
                publishedTime: "",
                modifiedTime: "",
                firstName: "",
                lastName: "",
                username: "",
                author: "",
                section: "",
                tag: "",
                isbn: "",
                releaseDate: "",
                gender: "",
              });
            }}
          >
            <ResetIcon className="mr-2 h-5 w-5" />
            Reset
          </Button>
        }
      />
      <MultiEditorLayout>
        <Container>
          <div className="mb-5 flex flex-col gap-4">
            <Label>Type</Label>
            <Select
              onValueChange={(value) => setInfoValue("type", value)}
              value={info.type}
            >
              <SelectTrigger>{info.type}</SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="book">Book</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="profile">Profile</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Tabs defaultValue="og">
            <TabsList>
              <TabsTrigger value="og">Open Gragh</TabsTrigger>
              <TabsTrigger value="x">Twitter (X)</TabsTrigger>
              {info.type === "article" && (
                <TabsTrigger value="article">Article</TabsTrigger>
              )}
              {info.type === "book" && (
                <TabsTrigger value="book">Book</TabsTrigger>
              )}
              {info.type === "profile" && (
                <TabsTrigger value="profile">Profile</TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="og">
              <div className="rounded-lg border border-secondary p-4">
                <div className="mb-2 flex flex-col gap-4">
                  <Label>Title</Label>
                  <Input
                    placeholder="Title"
                    value={info.title}
                    onChange={(e) => setInfoValue("title", e.target.value)}
                  />
                </div>
                <div className="mb-2 flex flex-col gap-4">
                  <Label>URL</Label>
                  <Input
                    placeholder="URL"
                    value={info.url}
                    onChange={(e) => setInfoValue("url", e.target.value)}
                  />
                </div>
                <div className="mb-2 flex flex-col gap-4">
                  <Label>Description</Label>
                  <Input
                    placeholder="Description"
                    value={info.description}
                    onChange={(e) =>
                      setInfoValue("description", e.target.value)
                    }
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="x">
              <div className="rounded-lg border border-secondary p-4">
                <div className="mb-2 flex flex-col gap-4">
                  <Label>Card Type</Label>
                  <Select
                    onValueChange={(value) => setInfoValue("cardType", value)}
                    value={info.cardType}
                  >
                    <SelectTrigger>{info.cardType}</SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="summary">Summary</SelectItem>
                        <SelectItem value="summary_large_image">
                          Summary Large Image
                        </SelectItem>
                        <SelectItem value="app">App</SelectItem>
                        <SelectItem value="player">Player</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-2 flex flex-col gap-4">
                  <Label>Site Account</Label>
                  <Input
                    placeholder="Site Account"
                    value={info.siteAccount}
                    onChange={(e) =>
                      setInfoValue("siteAccount", e.target.value)
                    }
                  />
                </div>
                <div className="mb-2 flex flex-col gap-4">
                  <Label>Creator Account</Label>
                  <Input
                    placeholder="Creator Account"
                    value={info.creatorAccount}
                    onChange={(e) =>
                      setInfoValue("creatorAccount", e.target.value)
                    }
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="article">
              {" "}
              <div className="rounded-lg border border-secondary p-4">
                <div className="mb-2 flex flex-col gap-4">
                  <Label>Published Time</Label>
                  <Input
                    placeholder="Published Time"
                    value={info.publishedTime}
                    onChange={(e) =>
                      setInfoValue("publishedTime", e.target.value)
                    }
                  />
                </div>
                <div className="mb-2 flex flex-col gap-4">
                  <Label>Modified Time</Label>
                  <Input
                    placeholder="Modified Time"
                    value={info.modifiedTime}
                    onChange={(e) =>
                      setInfoValue("modifiedTime", e.target.value)
                    }
                  />
                </div>
                <div className="mb-2 flex flex-col gap-4">
                  <Label>Author</Label>
                  <Input
                    placeholder="Author"
                    value={info.author}
                    onChange={(e) => setInfoValue("author", e.target.value)}
                  />
                </div>
                <div className="mb-2 flex flex-col gap-4">
                  <Label>Section</Label>
                  <Input
                    placeholder="Section"
                    value={info.section}
                    onChange={(e) => setInfoValue("section", e.target.value)}
                  />
                </div>
                <div className="mb-2 flex flex-col gap-4">
                  <Label>Tag</Label>
                  <Input
                    placeholder="Tag"
                    value={info.tag}
                    onChange={(e) => setInfoValue("tag", e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="book">
              <div className="rounded-lg border border-secondary p-4">
                <div className="mb-2 flex flex-col gap-4">
                  <Label>Author</Label>
                  <Input
                    placeholder="Author"
                    value={info.author}
                    onChange={(e) => setInfoValue("author", e.target.value)}
                  />
                </div>
                <div className="mb-2 flex flex-col gap-4">
                  <Label> ISBN</Label>
                  <Input
                    placeholder="ISBN"
                    value={info.isbn}
                    onChange={(e) => setInfoValue("isbn", e.target.value)}
                  />
                </div>
                <div className="mb-2 flex flex-col gap-4">
                  <Label>Release Date</Label>
                  <Input
                    placeholder="Release Date"
                    value={info.releaseDate}
                    onChange={(e) =>
                      setInfoValue("releaseDate", e.target.value)
                    }
                  />
                </div>
                <div className="mb-2 flex flex-col gap-4">
                  <Label>Tag</Label>
                  <Input
                    placeholder="Tag"
                    value={info.tag}
                    onChange={(e) => setInfoValue("tag", e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="profile">
              <div className="rounded-lg border border-secondary p-4">
                <div className="mb-2 flex flex-col gap-4">
                  <Label>First Name</Label>
                  <Input
                    placeholder="First Name"
                    value={info.firstName}
                    onChange={(e) => setInfoValue("firstName", e.target.value)}
                  />
                </div>
                <div className="mb-2 flex flex-col gap-4">
                  <Label>Last Name</Label>

                  <Input
                    placeholder="Last Name"
                    value={info.lastName}
                    onChange={(e) => setInfoValue("lastName", e.target.value)}
                  />
                </div>
                <div className="mb-2 flex flex-col gap-4">
                  <Label>Username</Label>
                  <Input
                    placeholder="Username"
                    value={info.username}
                    onChange={(e) => setInfoValue("username", e.target.value)}
                  />
                </div>
                <div className="mb-2 flex flex-col gap-4">
                  <Label>Gender</Label>
                  <Input
                    placeholder="Gender"
                    value={info.gender}
                    onChange={(e) => setInfoValue("gender", e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Container>
        <div className="h-full">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel minSize={25}>
              <Container className="h-full">
                <Editor value={output} setValue={setOutput} language={html()} />
              </Container>
            </ResizablePanel>
            <ResizableHandle className="my-5" withHandle />
            <ResizablePanel minSize={55}>
              <Container className="">
                <h3 className="mb-4 text-xl font-bold">Preview</h3>
                <Tabs>
                  <TabsList>
                    <TabsTrigger value="facebook">Facebook</TabsTrigger>
                    <TabsTrigger value="twitter">Twitter</TabsTrigger>
                    {/* <TabsTrigger value="discord">Discord</TabsTrigger> */}
                  </TabsList>
                  <TabsContent value="facebook">
                    <div>
                      <div className="w-[524px] max-w-full cursor-pointer font-[Helvetica]">
                        <div className="border-[1px] border-b-0 border-[#dadde1] bg-cover bg-center bg-no-repeat">
                          <div className="relative h-32">
                            <Image
                              className="absolute top-0 block h-full w-full object-cover"
                              src="https://placehold.co/600x400"
                              width={600}
                              height={400}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="break-words border-[1px] border-[#dadde1] bg-[#f2f3f5] px-[12px] py-[10px] antialiased">
                          <div className="overflow-hidden truncate whitespace-nowrap text-[12px] uppercase leading-[11px] text-[#606770]">
                            {info.url}
                          </div>
                          <div className="block h-[46px] max-h-[46px] border-separate select-none overflow-hidden break-words text-left">
                            <div className="mt-[3px] truncate pt-[2px] text-[16px] font-semibold leading-[20px] text-[#1d2129]">
                              {info.title}
                            </div>
                            <div className="mt-[3px] block h-[18px] max-h-[80px] border-separate select-none overflow-hidden truncate whitespace-nowrap break-words text-left text-[14px] leading-[20px] text-[#606770]">
                              {info.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="twitter">
                    <div>
                      <div className="relative w-[438px] max-w-full cursor-pointer overflow-hidden rounded-[0.85714em] border-[1px] border-[#e1e8ed] font-[Helvetica] leading-[1.3em] text-black -outline-offset-1">
                        <div className="bg-cover bg-center bg-no-repeat">
                          <div className="relative h-56 w-full">
                            <Image
                              className="absolute top-0 block h-full w-full object-cover"
                              src="https://placehold.co/600x400"
                              width={600}
                              height={400}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="absolute bottom-2 left-2 rounded bg-black bg-opacity-40 px-[4px] py-[2px] text-xs text-white">
                          {info.url}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  {/* <TabsContent value="discord">
                    <div>
                      <div className="grid w-[432px] max-w-full cursor-pointer items-start justify-self-start overflow-hidden rounded-[4px] border-l-[4px] border-[#202225] bg-[#2f3136] font-[Helvetica]">
                        <div className="inline-grid grid-cols-[auto] grid-rows-[auto] overflow-hidden pt-2 pr-4 pb-4 pl-3">
                          <div
                            className="mt-2 text-xs font-normal leading-4 text-white"
                            style={{
                              gridColumn: "1/1",
                            }}
                          >
                            {info.url}
                          </div>
                          <div className="mt-2 inline-block break-words text-base font-semibold text-[#00b0f4]">{info.title}</div>

                          <div
                            className="mt-2 whitespace-pre-line break-words border-0 p-0 text-sm font-normal text-[#dcddde]"
                            style={{
                              gridColumn: "1/1",
                            }}
                          >
                            {info.description}
                          </div>
                          <div className="mt-4 overflow-hidden rounded">
                            <div className="relative block ">
                              <Image src="https://placehold.co/600x400" width={600} height={400} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent> */}
                </Tabs>
              </Container>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </MultiEditorLayout>
    </BaseLayout>
  );
};

export default Page;

function generateOpenGraphTags({
  title,
  description,
  url,
  type,
  cardType,
  creatorAccount,
  siteAccount,
  firstName,
  lastName,
  username,
  author,
  isbn,
  modifiedTime,
  publishedTime,
  releaseDate,
  section,
  tag,
}: OGMeta): string {
  let ogInfo = "";
  let twitterInfo = "";
  const ogTypeTag = `<meta property="og:type" content="${type}" />\n`;
  const ogTitleTag = `<meta property="og:title" content="${title}" />\n`;
  const ogDescriptionTag = `<meta property="og:description" content="${description}" />\n`;
  const ogUrlTag = `<meta property="og:url" content="${url}" />\n`;
  const ogProfileFirstNameTag = `<meta property="profile:first_name" content="${firstName}" />\n`;
  const ogProfileLastNameTag = `<meta property="profile:last_name" content="${lastName}" />\n`;
  const ogProfileUsernameTag = `<meta property="profile:username" content="${username}" />\n`;
  const ogBookAuthorTag = `<meta property="book:author" content="${author}" />\n`;
  const ogBookIsbnTag = `<meta property="book:isbn" content="${isbn}" />\n`;
  const ogBookReleaseDateTag = `<meta property="book:release_date" content="${releaseDate}" />\n`;
  const ogArticleSectionTag = `<meta property="article:section" content="${section}" />\n`;
  const ogArticleTagTag = `<meta property="article:tag" content="${tag}" />\n`;
  const ogArticlePublishedTimeTag = `<meta property="article:published_time" content="${publishedTime}" />\n`;
  const ogArticleModifiedTimeTag = `<meta property="article:modified_time" content="${modifiedTime}" />\n`;

  const twitterCardTag = `<meta name="twitter:card" content="${cardType}" />\n`;
  const twitterTitleTag = `<meta name="twitter:title" content="${title}" />\n`;
  const twitterDescriptionTag = `<meta name="twitter:description" content="${description}" />\n`;
  const twitterUrlTag = `<meta name="twitter:url" content="${url}" />\n`;
  const twitterSiteAccountTag = `<meta name="twitter:site" content="${siteAccount}" />\n`;
  const twitterCreatorAccountTag = `<meta name="twitter:creator" content="${creatorAccount}" />\n`;

  if (type != "") ogInfo += ogTypeTag;
  if (title != "") ogInfo += ogTitleTag;
  if (description != "") ogInfo += ogDescriptionTag;
  if (url != "") ogInfo += ogUrlTag;
  if (firstName != "") ogInfo += ogProfileFirstNameTag;
  if (lastName != "") ogInfo += ogProfileLastNameTag;
  if (username != "") ogInfo += ogProfileUsernameTag;
  if (author != "" && type == "book") ogInfo += ogBookAuthorTag;
  if (isbn != "") ogInfo += ogBookIsbnTag;
  if (releaseDate != "") ogInfo += ogBookReleaseDateTag;
  if (section != "") ogInfo += ogArticleSectionTag;
  if (tag != "") ogInfo += ogArticleTagTag;
  if (publishedTime != "" && type == "article")
    ogInfo += ogArticlePublishedTimeTag;
  if (modifiedTime != "" && type == "article")
    ogInfo += ogArticleModifiedTimeTag;

  if (cardType != "") twitterInfo += twitterCardTag;
  if (title != "") twitterInfo += twitterTitleTag;
  if (description != "") twitterInfo += twitterDescriptionTag;
  if (url != "") twitterInfo += twitterUrlTag;
  if (siteAccount != "") twitterInfo += twitterSiteAccountTag;
  if (creatorAccount != "") twitterInfo += twitterCreatorAccountTag;

  return `
  <!-- Open Graph -->\n${ogInfo}
  <!-- Twitter -->\n${twitterInfo}`.trim();
}
