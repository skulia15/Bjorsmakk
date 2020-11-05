import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
    return (
        <div>
            <label></label>
            <input className={inputStyle.textInput} {...input} style={{ marginBottom: '5px'}} />
            <div class="form__group field">
                <input type="input" class="form__field" placeholder="Name" name="name" id='name' required />
                <label htmlFor="name" class="form__label">{label}</label>
            </div>
            {/* <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div> */}
        </div>
    );
}