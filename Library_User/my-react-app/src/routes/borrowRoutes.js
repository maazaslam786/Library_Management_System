router.get('/history/:userId', async (req, res) => {
    const { userId } = req.params;
  
    // Sample response: Replace with actual DB query
    const borrowingHistory = [
      { bookTitle: 'Book One', borrowDate: '2024-01-01', returnDate: '2024-01-10' },
      { bookTitle: 'Book Two', borrowDate: '2024-02-01', returnDate: '2024-02-15' },
    ];
  
    res.json(borrowingHistory);
  });
  