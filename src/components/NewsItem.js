import React from 'react'
import load from './ajax-loader.gif'
const NewsItem=(props)=> {

        let {title, description, urlToImage, url, date, author, source}= props
        return (
            <div>
                <div className="card">
                <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger" > {source} </span>
                    <img src={!urlToImage? load : urlToImage} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-body-secondary">By {author?author:'Unknown'} on {new Date(date).toGMTString()}</small></p>
                            <a rel="noreferrer" href={url} target='_blank' className="btn btn-dark">Read News</a>
                        </div>
                </div>
            </div>
        )
        
}

export default NewsItem
 