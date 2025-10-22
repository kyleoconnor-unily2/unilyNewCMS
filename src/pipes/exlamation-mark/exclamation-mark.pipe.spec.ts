import { ExclamationMarkPipe } from './exclamation-mark.pipe';

describe('ExclamationMarkPipe', () => {
    it('create an instance', () => {
        // Arrange
        const pipe = new ExclamationMarkPipe();

        // Assert
        expect(pipe).toBeTruthy();
    });

    it('should transform the value correctly', () => {
        // Arrange
        const pipe = new ExclamationMarkPipe();
        const text = 'test';
        const expectedResult = 'test!';

        // Act
        const result = pipe.transform(text);

        // Assert
        expect(expectedResult).toEqual(result);
    });
});
