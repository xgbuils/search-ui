import { h, render, Component } from 'preact';
import {CheckboxFilterProps} from './CheckboxFilterProps';
import {CheckboxFilterState} from './CheckboxFilterState';
import {FILTER_TYPE_RANGE} from "apisearch"
import Template from "../Template";
import {
    aggregationSetup,
    onChangeSearchAction
} from "./CheckboxFilterActions";

/**
 * Checkbox Filter Component
 */
class CheckboxFilterComponent extends Component<CheckboxFilterProps, CheckboxFilterState> {
    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            n: 0
        }
    }

    /**
     * Component will mount
     */
    componentWillMount() {

        const props = this.props;
        const environmentId = props.environmentId;
        const filterName = props.filterName;
        const aggregationField = props.filterField;
        const currentQuery = props.currentQuery;

        /**
         * Dispatch action
         */
        aggregationSetup(
            environmentId,
            currentQuery,
            filterName,
            aggregationField
        );
    }

    /**
     * Component will receive props
     *
     * @param props
     */
    componentWillReceiveProps(props) {

        const filterName = props.filterName;
        const filter = props.currentQuery.getFilter(filterName);
        const isNowActive = filter != null;

        let n = 0;
        const aggregation = props.currentResult.getAggregation(filterName);
        if (aggregation != null) {
            const counters = aggregation.getCounters();
            for (let i in counters) {
                let counter = counters[i];
                if (counter.values.name == 'true') {
                    n = counter.getN();
                }

            };
        }

        this.setState(prevState => {
            return {
                isActive: isNowActive,
                n: n
           };
        });
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
        const filterName = props.filterName;
        const filterField = props.filterField;

        /**
         * Dispatch action
         */
        onChangeSearchAction(
            environmentId,
            currentQuery,
            repository,
            filterName,
            filterField,
            e.target.checked
        );
    };

    /**
     * Render
     *
     * @return {any}
     */
    render(props, state) {

        let label = props.label
            ? props.label
            : props.filterName;
        let attributes = {};
        const n = this.state.n;
        if (this.state.isActive) {
            attributes['checked'] = 'checked';
        }

        return (
            <div className={`as-checkboxFilter`}>
                <input
                    type="checkbox"
                    class="as-checkboxFilter__checkbox"
                    {...attributes}
                    onClick={this.handleChange}
                />
                <label
                    class="as-checkboxFilter__label"
                >
                    {label} ({n})
                </label>
            </div>
        );
    }
}

export default CheckboxFilterComponent;
