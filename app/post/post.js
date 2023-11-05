'use client'
import { useState, useRef } from "react"
import { MdEditor } from "md-editor-rt"
import 'md-editor-rt/lib/style.css';
import "./post.css"
import "../navbar.css"

export default function Post_c({ avatar, headers}) {
    const [postType, setPostType] = useState(0)
    return (
        <main style={{rowGap:"1rem",height:"100%"}}>
            <div className="navbar w-full bg-white">
                <a className='navbar-ico' href="/">
                    <img src='./logo.svg' alt='logo' />
                    <div>喵站</div>
                </a>
                <div className="center">
                    <button
                        className={"b " + ((postType == 0) ? 'bg-gray-300' : '')}
                        onClick={e => setPostType(0)}
                    >发帖</button>
                    <button
                        className={"b " + ((postType == 1) ? 'bg-gray-300' : '')}
                        onClick={e => setPostType(1)}
                    >上传视频</button>
                </div>
                <div className="center-after">
                    <img src={avatar} alt="avatar" />
                </div>
            </div>
            <div><PostPannel type={postType} headers={headers} /></div>
        </main>
    )
}

function PostPannel({ type,headers}) {
    const [text, setText] = useState('')
    const titleInput = useRef(null)
    async function handleClickForum() {
        var formData = new FormData(forumpost)
        formData.append('title', titleInput.current.value)
        formData.append('text', text)
        const response = await fetch("http://localhost:8000/uapi/add_mainforum", {
            method: 'POST',
            body: formData,
            credentials: "include",
            headers: {
                cookie: headers.cookie
            },
        })
        switch (await response.status) {
            case 200:
                alert("发帖成功");
                break;
            default:
                alert("发帖失败");
                break;
        }
    }

    if (type == 0) {
        return (
            <div className="post-pannel">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span className="text-3xl">帖子标题:</span>
                    <input className="border h-10 text-2xl" ref={titleInput} />
                </div>
                <MdEditor modelValue={text} onChange={setText} style={{ height: "70vh" }} />
                <form id="forumpost">
                    <div>类型选择</div>
                    <select name="type" defaultValue="1" className="border">
                        <option value={0}>用户反馈</option>
                        <option value={1}>Thread贴</option>
                        <option value={2}>资源帖</option>
                        <option value={3}>灌水贴</option>
                    </select>
                    <button onClick={handleClickForum} className="duration-300 bg-white rounded-xl border w-16 hover:bg-[#bfbfbf]">发帖</button>
                </form>
            </div>
        )
    }
}