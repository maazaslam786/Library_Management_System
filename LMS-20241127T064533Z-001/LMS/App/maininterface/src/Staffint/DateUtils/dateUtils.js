export const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const date = new Date(dateString);
    return isNaN(date) ? "" : date.toLocaleDateString(undefined, options);
};
