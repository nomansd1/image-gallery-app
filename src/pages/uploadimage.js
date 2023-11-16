import React, { useState, useRef, useEffect } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Upload, Select, Input, Space, Tag, theme, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
export default function UploadImage() {
    const [category, setCategory] = useState('')
    const handleChange = (value) => {
        setCategory(value)

    };
    const [file, setFile] = useState('')
    const onFileChange = (key, e) => {
        setFile(e)
    }
    const { token } = theme.useToken();
    const [tags, setTags] = useState(['Unremovable', 'Tag 2', 'Tag 3']);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef(null);
    const editInputRef = useRef(null);
    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);
    useEffect(() => {
        editInputRef.current?.focus();
    }, [editInputValue]);
    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        console.log(newTags);
        setTags(newTags);
    };
    const showInput = () => {
        setInputVisible(true);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleInputConfirm = () => {
        if (inputValue && !tags.includes(inputValue)) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };
    const handleEditInputChange = (e) => {
        setEditInputValue(e.target.value);
    };
    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        setEditInputIndex(-1);
        setEditInputValue('');
    };
    const tagInputStyle = {
        width: 64,
        height: 22,
        marginInlineEnd: 8,
        verticalAlign: 'top',
    };
    const tagPlusStyle = {
        height: 22,
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };
    const TagComponenet = () => {
        return (
            <Space size={[0, 8]} wrap>
                {tags.map((tag, index) => {
                    if (editInputIndex === index) {
                        return (
                            <Input
                                id={`editInput-${index}`} // Unique id for each edit input
                                ref={editInputRef}
                                key={tag}
                                size="small"
                                style={tagInputStyle}
                                value={editInputValue}
                                onChange={handleEditInputChange}
                                onBlur={handleEditInputConfirm}
                                onPressEnter={handleEditInputConfirm}
                            />
                        );
                    }
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag
                            key={tag}
                            closable={index !== 0}
                            style={{
                                userSelect: 'none',
                            }}
                            onClose={() => handleClose(tag)}
                        >
                            <span
                                onDoubleClick={(e) => {
                                    if (index !== 0) {
                                        setEditInputIndex(index);
                                        setEditInputValue(tag);
                                        e.preventDefault();
                                    }
                                }}
                            >
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </span>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
                {inputVisible ? (
                    <Input
                        id="newTagInput" // Unique id for the new tag input
                        ref={inputRef}
                        type="text"
                        size="small"
                        style={tagInputStyle}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                    />
                ) : (
                    <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
                        New Tag
                    </Tag>
                )}
            </Space>
        );

    }
    const dispatch = useDispatch()
    console.log(tags || tags.split(','));
    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // Append tags as an array
        tags.forEach((tag, index) => {
            formData.append('tag', tag);
        });

        // Append files
        file.fileList.forEach((file, index) => {
            formData.append('image', file.originFileObj);
        });

        // Append other form fields
        formData.append('category', category);
        // Send a POST request to your backend
        try {
            
            const response = await fetch('https://legendary-palm-tree-gr95q756r5hwr7v-8000.app.github.dev/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Handle success
                const result = await response.json();
                console.log('Upload successful:', result);
            } else {
                // Handle error
                console.error('Upload failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    console.log(file);
    return (
        <>
            {/* component */}
            <div className="flex items-center justify-center p-12">
                {/* Author: FormBold Team */}
                {/* Learn More: https://formbold.com */}
                <div className="mx-auto w-full max-w-[550px] bg-white">
                    <form
                        className="py-6 px-9"
                        action="https://formbold.com/s/FORM_ID"
                        method="POST"
                    >
                        <div className="mb-5">
                            <label
                                for="text"

                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Send files to this email:
                            </label>
                            <Select
                                defaultValue="Pizza"

                                style={{ width: 120 }}
                                onChange={handleChange}
                                options={[
                                    { value: 'Pizza', label: 'Pizza' },
                                    { value: 'Burger', label: 'Burger' },
                                    { value: 'Biryani', label: 'Biryani' },
                                ]}
                            />

                        </div>
                        <div className="mb-6 pt-4">
                            <label for="file" className="mb-5 block text-xl font-semibold text-[#07074D]">
                                Upload File
                            </label>
                            <div className="mb-8">
                                <Upload
                                    id="file" // Add the id attribute here
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    listType="picture"
                                    onChange={(e) => { onFileChange('image', e) }}
                                >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                                <br />
                                <br />

                            </div>

                            <TagComponenet />
                        </div>
                        <div>
                            <button onClick={(e) => { handleUpload(e) }} className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                Send File
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
