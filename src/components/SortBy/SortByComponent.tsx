import { h, render, Component } from 'preact';
import {SortByProps} from './SortByProps';
import {
    onChangeSearchAction,
    initialSortBySetup
} from "./SortByActions";

/**
 * SortBy Filter Component
 */
class SortByComponent extends Component<SortByProps> {

    /**
     * Components will mount
     */
    componentWillMount() {

        const props = this.props;
        const environmentId = props.environmentId;
        const options = props.options;
        const currentQuery = props.currentQuery;

        /**
         * Dispatch action
         */
        initialSortBySetup(
            environmentId,
            currentQuery,
            options[0].value,
        );
    }

    /**
     * Should component update
     *
     * @return {boolean}
     */
    shouldComponentUpdate() {
        return false;
    }

    /**
     * Handle change
     *
     * @param e
     */
    handleChange = (e) => {

        const props = this.props;
        const environmentId = props.environmentId;
        const currentQuery = props.currentQuery;
        const repository = props.repository;

        /**
         * Dispatch action
         */
        onChangeSearchAction(
            environmentId,
            currentQuery,
            repository,
            e.target.value
        );
    };

    /**
     * Render
     *
     * @return {any}
     */
    render(props, state) {

        const containerClassName = props.classNames.container;
        const selectClassName = props.classNames.select;
        let options = props.options;
        const coordinate = props.currentQuery.toArray().coordinate;

        if (!coordinate) {
            options = options.filter(function(o) {
                return o.value != 'distance';
            });
        }

        return (
            <div className={`as-sortBy ${containerClassName}`}>
                <select
                    className={`as-sortBy__selector ${selectClassName}`}
                    onChange={this.handleChange}
                >
                    {options.map(option => (
                        <option value={option.value}>{option.name}</option>
                    ))}
                </select>
            </div>
        );
    }
}

SortByComponent.defaultProps = {
    classNames: {
        container: '',
        select: ''
    }
};

export default SortByComponent;
