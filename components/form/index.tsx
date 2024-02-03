"use client";

import { Button } from "@/components/ui/button";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { llms } from "@/models/llm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function () {
  const router = useRouter();
  const [imgDescription, setImageDescription] = useState("");
  const [llmName, setLlmName] = useState("sd");
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState<string | ArrayBuffer | null | undefined>(
    null
  );
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result);
      reader.readAsDataURL(file);
    }
  };

  const handleResetFile = () => {
    setImage(null);
    setFile(null);
  };

  const handleSubmit = async () => {
    console.log("file", file);
    if (!file) {
      toast.error("请上传封面图片");
      return;
    }
    if (!imgDescription) {
      toast.error("请输入图片描述");
      return;
    }
    if (!llmName) {
      toast.error("请选择绘画模型");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("llm_name", llmName);
    formData.append("img_description", imgDescription);

    try {
      setLoading(true);
      const resp = await fetch(`/api/upload-cover`, {
        method: "POST",
        body: formData,
      });
      setLoading(false);

      const { code, message, data } = await resp.json();
      console.log("upload cover res: ", code, message, data);

      if (resp.status === 401) {
        toast.error("请先登录");
        router.push("/sign-in");
        return;
      }

      if (code !== 0) {
        toast.error(message);
        return;
      }

      toast.success("上传成功");

      // router.push(`/cover/${data.uuid}`);
      router.push("/covers/mine");
    } catch (e) {
      console.log("upload cover failed: ", e);
      toast.error("上传失败");
    }
  };

  return (
    <div>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                封面图片 *
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                {image ? (
                  <div className="text-center">
                    <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
                      <img src={image as string} alt="Preview" />
                    </div>

                    <p
                      className="mt-8 cursor-pointer bg-red-500 text-white inline-block px-8 py-2 rounded-full"
                      onClick={handleResetFile}
                    >
                      X
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative border border-slate-300 px-4 py-2 cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>

                    <p className="block text-xs leading-5 text-gray-600 mt-8">
                      PNG, JPG, JPEG 图片，不超过 10M
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                图片描述*
              </label>
              <div className="mt-2">
                <textarea
                  placeholder="请输入图片描述"
                  className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  value={imgDescription}
                  onChange={(e) => setImageDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                绘图模型*
              </label>
              <select
                className="mt-2 block w-full rounded-md border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={llmName}
                onChange={(e) => setLlmName(e.target.value)}
              >
                <option value="">选择绘图模型</option>
                {Object.keys(llms).map((key: string) => {
                  const title = llms[key];
                  return (
                    <option key={key} value={key}>
                      {title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center">
        {loading ? (
          <Button type="button" size={"lg"} disabled>
            上传中...
          </Button>
        ) : (
          <Button type="button" size={"lg"} onClick={handleSubmit}>
            上传封面图片
          </Button>
        )}
      </div>
    </div>
  );
}
