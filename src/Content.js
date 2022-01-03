import { useEffect } from "react"
import { useState } from "react"
/*useEffect:
1. Update DOM 
2. Call api
3. Listen Dom Events
4. Cleanup
*/

/*
1. useEffect(callback) - gọi callback mỗi khi component đc mounted
2. useEffect(callback, []) - gọi callback 1 lan duy nhat sau khi component dc mounted
3. useEffect(callback, [deps])
 */

function Content(){
    const tabs = ['posts', 'comments', 'albums']

    const [title, setTitle] = useState('');
    const [types, setTypes] = useState('posts')
    const [posts, setPosts] = useState([])

    //1. useEffect(callback) - Update DOM -> callback luôn đc gọi sau khi component mounted
    useEffect(() => {
        console.log('Mounted')

        //thay đổi title
        document.title = title;
    })

    //2. useEffect(callback, []) -Call api -> gọi callback 1 lan duy nhat sau khi component dc mounted
    //vd1

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${types}`)
            .then(res => res.json())
            .then(posts => {
                setPosts(posts);
            })
    }, [types])

    //3. useEffect(callback, [deps])


    return (
        <div>
            {/*  //1. useEffect(callback) - Update DOM -> callback luôn đc gọi sau khi component mounted */}
            <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            />


            
             {/* 3. useEffect(callback, [deps]) */}
             <div>
             {
                tabs.map(tab => {
                    return <button key = {tab}
                                   onClick={() => setTypes(tab)}
                                   style = {types === tab ? {
                                        color: "#fff",
                                        backgroundColor: "#333"
                                   } : {}}
                                   >{tab}</button>
                })
            }
             </div>

            {/* 2. useEffect(callback, []) -Call api -> gọi callback 1 lan duy nhat sau khi component dc mounted */}
            <ul>
                {posts.map(post => {
                    return <li key={post.id} style={{listStyle: "none"}}>{post.title || post.name}</li>
                })}
            </ul>

           

        </div>
    )
}

export default Content