import { storeEvent, loadEvents } from './event-storage';
import { MOVEMENT_EVENT, MovementEvent } from './event-bus';
import CartesianCoords from './CartesianCoordinates';

beforeEach(() => {
    sessionStorage.clear();
    sessionStorage.setItem.mockClear();
});

const mockEvent = {
    detail: {
        toJson() {
            return '{}';
        }
    }
};

const mockMovementEventSerialized = `{
            \"type\":\"map-obj-move\",
            \"message\":\"map object moved to x: 2, y: 3 from x: 2, y: 3\",
            \"coords\":{\"x\":2,\"y\":3},
            \"oldCoords\":{\"x\":2,\"y\":3}}`;

describe('store-event', () => {
    it('should work', () => {
        storeEvent(mockEvent);
        expect(sessionStorage.setItem).toHaveBeenCalledWith('events', '{}');
    });
    it('should add a second event', () => {
        storeEvent(mockEvent);
        storeEvent(mockEvent);
        expect(sessionStorage.setItem).toHaveBeenLastCalledWith('events', '{}%%{}');
    });
    it('should serialize movement events', () => {
        const mockCoords = new CartesianCoords(2, 3);
        storeEvent(new CustomEvent('foo', {
            detail: new MovementEvent(mockCoords, mockCoords, 1)
        }));

        const expected = JSON.parse(mockMovementEventSerialized);
        const actual = JSON.parse(sessionStorage.setItem.mock.calls[0][1]);
        // don't bother comparing dates.
        delete actual.date;
        expect(actual).toMatchObject(expected);
    });
});

describe('loadEvents', () => {
    it('throws error if no type', () => {
        const mockObj = {}
        sessionStorage.setItem('events', JSON.stringify(mockObj));
        expect(loadEvents).toThrow();
    });
    it('app event deserialize', () => {
        const mockObj = {
            type: 'foo',
            message: 'bar'
        }
        sessionStorage.setItem('events', JSON.stringify(mockObj));
        const result = loadEvents();
        expect(result[0].type).toBe('foo');
        expect(result[0].message).toBe('bar');
    });
    it('movement event deserialize', () => {
        sessionStorage.setItem('events', mockMovementEventSerialized);
        const result = loadEvents();
        expect(result[0].type).toBe(MOVEMENT_EVENT);
        expect(result[0]).toMatchObject({ "x": 2, "y": 3 });
        expect(result[0].coords).toMatchObject({ "x": 2, "y": 3 });
    });
});