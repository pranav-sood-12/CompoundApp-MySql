
// In javaScript all the objects are passed through refernce hence to avoid this by using spread operator. ex in line no 31

class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    pagination(resultPerPage) {
        let pageNumber = Number(this.queryStr.page) || 1;
        let skip = resultPerPage * (pageNumber - 1);

        
        this.query = {
            ...this.query,
            limit: resultPerPage,
            offset: skip
        };

        return this;
    }
}

export default ApiFeatures;