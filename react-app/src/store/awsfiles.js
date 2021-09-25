export const uploadFile = (fileForm) => async (dispatch) => {
    const {
        user_id,
        /* all,
           other,
           form,
           fields, */
        file // this is the file for uploading
    } = fileForm;

    const form = new FormData();
    form.append('user_id', user_id);
    // repeat as necessary  for each required form field
    form.append('file', file);

    const res = await fetch('/api/uploads', {
        method: "POST",
        body: form
    });
};
