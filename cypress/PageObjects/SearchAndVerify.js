import Search from './Search';
import SearchInTable from './SearchInTable';

class SearchAndVerify {
    constructor() {
        this.search = new Search();
        this.searchInTable = new SearchInTable();
    }

    searchAndVerify(sectionName, text, expectedData) {
        this.search.searchAndVerifyResults(sectionName, text);
        this.searchInTable.verifyTableContent(expectedData, sectionName);
    }
}

export default SearchAndVerify;
