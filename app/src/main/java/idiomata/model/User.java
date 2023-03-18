package idiomata.model;

import javax.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(generator = "userGen", strategy = GenerationType.SEQUENCE)
    private long id;

    @Column()
    private String firstName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String language;

    public User(){}

    public User(String firstName, String email, String language) {
        this.firstName = firstName;
        this.email = email;
        this.language = language;
    }
}
