export class Generator {
  private dictionary: string[];
  private gridPosition: number[];
  private alternative: boolean;

  constructor(dictionary: string[], count: number, alternative = false) {
    this.dictionary = dictionary;
    this.alternative = alternative;
    this.gridPosition = alternative ? [0] : Array(count).fill(0);
  }

  // TODO : implemenet complete for alternative = true
  private isComplete(): boolean {
    return this.gridPosition.every(
      (elem) => elem >= this.dictionary.length - 1,
    );
  }

  private incrementGridPosition() {
    for (let i = this.gridPosition.length - 1; i >= 0; i--) {
      if (this.gridPosition[i] < this.dictionary.length - 1) {
        this.gridPosition[i]++;
        return;
      }
      this.gridPosition[i] = 0;
    }
    if (this.alternative) {
      this.gridPosition.push(0);
    }
  }

  private createStringFromGrid(
    indices: number[],
    dictionary: string[],
  ): string {
    return indices.map((i) => dictionary[i]).join('');
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        if (!this.isComplete()) {
          this.incrementGridPosition();
          const res = this.createStringFromGrid(
            this.gridPosition,
            this.dictionary,
          );
          return { value: res, done: false };
        }
        return { value: '', done: true };
      },
    };
  }
}

module.exports = Generator