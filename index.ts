class Generator {
  private readonly alternative: boolean;
  private readonly dictionary: string[];
  private gridPosition: number[];
  private readonly length: number;

  constructor(dictionary: string[], length: number, alternative = false) {
    this.dictionary = dictionary;
    this.alternative = alternative;
    this.length = length;
    this.gridPosition = alternative ? [0] : Array(length).fill(0);
  }

  private isComplete(): boolean {
    const everyCellFilled = this.gridPosition.every(
      (elem) => elem >= this.dictionary.length - 1,
    );
    if (this.alternative) {
      return everyCellFilled;
    }
    return this.gridPosition.length === this.length && everyCellFilled;
  }

  private incrementGridPosition(): void {
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

module.exports = Generator;
