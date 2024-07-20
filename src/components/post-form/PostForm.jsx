import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from "../index"
import appwriteService from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import RequiredField from '../messages/RequiredField'
import { Alert, Typography } from "@material-tailwind/react";

function PostForm({post}) {
    const [loading, setLoading] = useState(false)
    const {register, handleSubmit, watch, setValue, control, getValues, formState} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const { errors } = formState;
    
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setLoading(true)
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                // console.log("delete")
                appwriteService.deleteFile(post.featuredImage).then( () => {
                    navigate('/my-posts')
                });
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            }).then( ()=> {
                setLoading(false);
                navigate('/my-posts')
            });

            // if (dbPost) {
            //     navigate(`/post/${dbPost.$id}`);
            // }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);
            if (file) {
                // console.log("Hello")
                // console.log(userData)
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id, userName: userData.name }).then( () => {
                    setLoading(false)
                    navigate(`/my-posts`)    
            });
            // navigate(`/post/${dbPost.$id}`);
                
                
            }
        }
        setLoading(false)
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap pt-10 pb-10">
            
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", 
                        { required: {
                                        value: true, 
                                        message: "Title is required.",
                                    }, 
                        }
                        )
                    }
                />
                {/* <Input
                    label="Caption :"
                    placeholder="Caption"
                    className="mb-4"
                    {...register("content", { required: true })}
                /> */}
                <Input
                    placeholder="Slug"
                    disabled
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                    hidden
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} 
                {...register("content", { required: {
                        value: true, 
                        message: "Content is required.",
                    }, })}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: {value: !post, message: "Please upload an image."} })}
                />
                {post && (
                    <div className="w-full mb-4">
                        {/* {console.log(post)} */}
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: {value: true} })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {loading?"Please Wait... ":post ? "Update" : "Submit"}
                </Button>
                <div className='text-left text-rose-600 mt-5'>
                
                {errors.title && <li>{errors.title.message}</li>}
                {errors.content && <li>{errors.content.message}</li>}
                {errors.image && <li>{errors.image.message}</li>}
                </div>
            </div>
            
        </form>
    );
}

export default PostForm
