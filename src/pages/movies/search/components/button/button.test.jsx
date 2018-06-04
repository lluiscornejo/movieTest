import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

// Component
import Button from './index';

/**
 * Mount the component and render
 * @returns {*}
 */
function renderComponent(props) {
    return mount(<Button {...props} />);
}

describe('Button', () => {

    it('should display the text', () => {
        // Arrange
        const text = 'Search text';
        const component = renderComponent({text});
        const paragraphText = component.find('button span').text();

        // Assert
        assert.strictEqual(paragraphText, text);
    });

    it('should display the loading status', () => {
        // Arrange
        const loading = true;
        const component = renderComponent({loading});
        const iconElement = component.find('svg').exists();

        // Assert
        assert.ok(iconElement);
    });

    it('should display the loading status', () => {

        // Arrange
        const onClick = sinon.spy();
        const component = renderComponent({onClick});

        // Actions
        // - Simulate clicking the button
        component.find('button').simulate('click');

        // Assert
        assert.ok(onClick.called);
    });
});
