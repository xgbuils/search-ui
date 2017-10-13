import AbstractReadWriteWidget from "./AbstractReadWriteWidget";

export default class InputText extends AbstractReadWriteWidget {
    constructor(target, {
        className = '',
        value = '',
        placeholder = '',
        eventTrigger = 'keyup'
    }) {
        super(target);

        this.type = 'text';
        this.className = className;
        this.value = value;
        this.placeholder = placeholder;
        this.eventTrigger = eventTrigger;
    }

    render() {
        let target = document.querySelector(this.target);

        target.innerHTML = `<input
            class="${this.className}" 
            type="${this.type}" 
            value="${this.value}" 
            placeholder="${this.placeholder}"
        >`;
    }

    updateQuery(query, value) {
        return Object.assign(
            Object.create(query),
            {
                ...query,
                q: value
            },
        );
    }
}