import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [load, setLoad] = useState(true);
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        try {
            let response = await fetch(url);
            props.setProgress(50);
            let data = await response.json();
            props.setProgress(70);

            if (data.articles && data.totalResults) {
                setArticles(data.articles);
                setTotalResults(data.totalResults);
            } else {
                console.error('Invalid API response:', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoad(false);
            props.setProgress(100);
        }
    };

    useEffect(() => {
        updateNews();
    }, []); // Run once on component mount

    const fetchMoreData = async () => {
        props.setProgress(10);
        const nextPage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;

        try {
            let response = await fetch(url);
            props.setProgress(50);
            let data = await response.json();
            props.setProgress(70);

            if (data.articles && data.totalResults) {
                setArticles([...articles, ...data.articles]);
                setTotalResults(data.totalResults);
                setPage(nextPage); // Update page number
            } else {
                console.error('Invalid API response:', data);
            }
        } catch (error) {
            console.error('Error fetching more data:', error);
        } finally {
            props.setProgress(100);
        }
    };

    return (
        <div className="container my-3">
            <h1 className="text-center" style={{ margin: "90px 0px 35px 0px" }}>
                NewsFlux - Top {capitalizeFirstLetter(props.category)} Headlines
            </h1>
            {load && <Loading />} {/* Show loading indicator */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Loading />} 
            >
                <div className="container">
                    <div className="row">
                        {articles.map((article) => (
                            <div className="col-md-4 my-3" key={article.url}>
                                <NewsItem
                                    title={article.title}
                                    description={article.description}
                                    url={article.url}
                                    urlToImage={article.urlToImage}
                                    author={article.author}
                                    date={article.publishedAt}
                                    source={article.source.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    );
};

News.defaultProps = {
    pageSize: 6,
    country: "in",
    category: "general",
};

News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
};

export default News;
