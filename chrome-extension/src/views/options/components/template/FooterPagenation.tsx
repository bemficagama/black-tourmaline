import React, { Component } from "react";
import ReactPaginate from "react-paginate";

interface IProps {
    onNewButtonClick: any
    handlePageClick: any
    pageCount: number
    currentPage?: number
}

export default class FooterPagination extends Component<IProps> {

    render() {
        return (
            <div className='d-flex flex-row'>
                <div className='p-2 flex-grow-1'>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={this.props.handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={this.props.pageCount}
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        forcePage={this.props.currentPage}
                    />
                </div>
                <div className='p-2'>
                    <button className="btn btn-primary"
                        onClick={this.props.onNewButtonClick}>
                        Nova
                    </button>
                </div>
            </div>
        )
    }

}