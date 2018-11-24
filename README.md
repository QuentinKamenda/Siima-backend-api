# Siima Backend API

### How to write a commit message:

`$1,$2,$3,$4` (Tiltle of the commit: see description below)
<br>(Mandatory blank line)
<br> `Long description responding to WHAT+ BECAUSE (2 lines)`
<br>blank line
<br> `Bullet list  HOW vs WHY at imperative tense`
<br>blank line
<br>`Related to:#27 #14`
<br>blankline
<br>`Author: Jean-Charles`

#### Title description:
* **$1** =`Ref #34`  (this reference the issue number issue , here issue 34)
* **$2** = Ft / Fx / Ht / Lm
  * Ft=Feature= The commit happened while you were developing it and wasn’t merged into `master`
  * Fx=Fix : This commit re-opened an issue which was merge into `master`
  * Hf= Hot Fix : commit for fast deploy to production
  * Lm= Lazy message when you will write the long description message later (use case : share code faster)
* **$3** Two to three words describing the theme of the issue or the scope (Where)
* **$4** Short description at imperative tense
Usualy the "Why" is in the Issue.
