import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "./firebase";
import FormField from "./FormField";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { categoryFilters } from "./constants";

const ProjectForm = ({ type, session, project }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    image: project?.image || "",
    title: project?.title || "",
    description: project?.description || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName, value) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!form.title.trim()) errors.title = 'Title is required';
    if (!form.description.trim()) errors.description = 'Description is required';
    if (!form.category) errors.category = 'Category is required';
    if (!form.image) errors.image = 'Image is required';
    return errors;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);

    try {
      let imageUrl = form.image;
      if (form.image.startsWith("data:image")) {
        const imageRef = ref(storage, `images/${uuidv4()}`);
        await uploadString(imageRef, form.image, 'data_url');
        imageUrl = await getDownloadURL(imageRef);
      }

      const projectData = {
        ...form,
        image: imageUrl,
        createdBy: session?.user?.id,
      };

      if (type === "create") {
        await addDoc(collection(db, "projects"), projectData);
        navigate("/");
      }

      if (type === "edit") {
        const projectRef = doc(db, "projects", project?.id);
        await updateDoc(projectRef, projectData);
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="flex flex-col items-start w-full max-w-3xl mx-auto space-y-6 p-4 sm:p-6 md:p-8"
      onSubmit={handleFormSubmit}
    >
      <div className="flex flex-col items-center w-full">
        <label htmlFor="image" className="cursor-pointer text-center py-2">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="hidden"
          onChange={handleImageChange}
        />
        {form.image && (
          <img
            src={form.image}
            alt="Project"
            className="object-contain p-4"
            style={{ maxWidth: '100%', maxHeight: '300px' }}
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        setState={(value) => handleStateChange("title", value)}
        placeholder="Title"
      />
      <FormField
        title="Description"
        state={form.description}
        setState={(value) => handleStateChange("description", value)}
        placeholder="Showcase and discover remarkable developer projects."
        isTextArea
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        setState={(value) => handleStateChange("liveSiteUrl", value)}
        placeholder="https://yoursiteurl.com"
      />
      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        setState={(value) => handleStateChange("githubUrl", value)}
        placeholder="https://github.com/yourrepo"
      />
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />
      <Button
        title={isSubmitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
        type="submit"
        leftIcon={isSubmitting ? "" : "/plus.svg"}
        submitting={isSubmitting}
      />
    </form>
  );
};

export default ProjectForm;