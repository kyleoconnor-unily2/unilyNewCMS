import { TestBed } from '@angular/core/testing';
import { LoggingService } from './logging.service';

describe('LoggingService', () => {
    let sut: LoggingService;
    let logSpy: jasmine.Spy<{ (...data: any[]): void; (message?: any, ...optionalParams: any[]): void; }>;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        sut = new LoggingService();
        logSpy = spyOn(console, 'log');
    });

    it('should be created', () => {
        // Assert
        expect(sut).toBeTruthy();
    });

    it('should have called console log', () => {
        // Arrange
        const expectedResult = 'Hello World';

        // Act
        sut.log(expectedResult);

        // Assert
        expect(logSpy).toHaveBeenCalledWith(expectedResult);
    });
});
