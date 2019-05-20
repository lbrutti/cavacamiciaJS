;; utility functions
;; rimuove n elementi
(define (remove-nth lst n)
  (if (= n 0)
    (cdr lst)
    (append (list (car lst)) (remove-nth (cdr lst) (- n 1)))))

;;mescola
(define (shuffle a)
  (if (= (length a) 1)
    a
    (let ((random-element-index (random (length a))))
      (cons (list-ref a random-element-index)
            (shuffle (remove-nth a random-element-index))))))

;; card deck
(define deck '(1 2 3 4 5 6 7 8 9 0
               1 2 3 4 5 6 7 8 9 0
               1 2 3 4 5 6 7 8 9 0
               1 2 3 4 5 6 7 8 9 0))

;;gioca una mano
(define (play-hand playing-deck opponent-deck table-deck turn remaining-payment)
  (if (null? playing-deck)
      turn
      (let ((last-element (car playing-deck)))
        (if (or (= last-element 3)
                (= last-element 2)
                (= last-element 1))
          (play-hand opponent-deck
                     (cdr playing-deck)
                     (cons last-element table-deck)
                     (+ 1 turn)
                     last-element)
          (if (= remaining-payment 1)
            (play-hand (append opponent-deck (cons last-element table-deck))
                       (cdr playing-deck)
                       '()
                       (+ 1 turn)
                       1)
            (play-hand (cdr playing-deck)
                       opponent-deck
                       (cons last-element table-deck)
                       turn
                       (- remaining-payment 1)))))))

(define (play-game)
  (let* ((shuffled-deck (shuffle deck))
         (player1-deck (list-tail shuffled-deck 20))
         (player2-deck (list-tail (reverse shuffled-deck) 20)))
    (play-hand (list-tail shuffled-deck 20) (list-tail (reverse shuffled-deck) 20) '() 0 1)))

(define (play-games n)
  (if (not (= n 0))
    (begin
      (display (play-game))
      (newline)
      (play-games (- n 1)))))
