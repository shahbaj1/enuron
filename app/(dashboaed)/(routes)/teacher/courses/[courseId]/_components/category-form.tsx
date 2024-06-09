"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { FormEvent, FormEventHandler, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";

interface CategoryFormProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
}

// const formSchema = z.object({
//   categoryId: z.string().min(1),
// });

export const CategoryForm = ({
  initialData,
  courseId,
  options,
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [SavedcategoryId, setSavedCategoryId] = useState("");

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true)
      await axios.patch(`/api/courses/${courseId}`, { categoryId });
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false)
      setSavedCategoryId(categoryId)
    }
  };

  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId
  );

  const onInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(event.target.value);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course category
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <div onClick={() => setCategoryId(SavedcategoryId)}>Cancel</div>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.categoryId && "text-slate-500 italic"
          )}
        >
          {selectedOption?.label || "No category"}
        </p>
      )}
      {isEditing && (
        <form onSubmit={onSubmit}>
          <Combobox options={options} onChange={onInputChange} selected={categoryId} />
          <div className="flex items-center gap-x-2 mt-2">
            <Button type="submit" disabled={isSubmitting || categoryId === "" || categoryId === SavedcategoryId}>Save</Button>
          </div>
        </form>
      )}
    </div>
  );
};
