import { storeEvent, loadEvents } from './event-storage';

beforeEach(() => {
  sessionStorage.clear();
});

const mockEvent = {
    detail: {
        toJson() {
            return '{}';
        }
    }
};

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
});

describe('loadEvents', () => {
    beforeEach(() => {
        sessionStorage.setItem('events', '{"type":"foo"}');
    });
    it('should work', () => {
        const result = loadEvents();
        expect(sessionStorage.getItem).toHaveBeenLastCalledWith('events');
        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({type: 'foo'});
    });
});