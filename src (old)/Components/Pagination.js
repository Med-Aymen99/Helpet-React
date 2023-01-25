import React from "react"

export default function Pagination(props) {
    const pages = props.pages.map((page,index)=> {
        return <button key={index} onClick={()=>{props.setCurrentPage(page)}} className={page==props.currentPage? 'active' : ''}>{page}</button>
    })
    return (
        <div>
            {pages}
        </div>
    )
}
