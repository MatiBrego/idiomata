package idiomata.repository;

import idiomata.model.User;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class UserRepository {
    private final EntityManagerFactory managerFactory;

    public UserRepository(){
        this.managerFactory = Persistence.createEntityManagerFactory("idiomata");
    }

    public void createUser(String name, String email, String language){
        EntityManager userManager = managerFactory.createEntityManager();

        EntityTransaction transaction = userManager.getTransaction();

        transaction.begin();

        final User newUser = new User(name, email, language);

        userManager.persist(newUser);

        transaction.commit();

        userManager.close();
    }

    public void deleteUserById(long id){
        EntityManager userManager = managerFactory.createEntityManager();

        EntityTransaction transaction = userManager.getTransaction();

        transaction.begin();

        User result = userManager.find(User.class, id);

        userManager.remove(result);

        transaction.commit();

        userManager.close();
    }

    public User findUserById(long id){
        EntityManager userManager = managerFactory.createEntityManager();

        EntityTransaction transaction = userManager.getTransaction();

        transaction.begin();

        User result = userManager.find(User.class, id);

        transaction.commit();

        userManager.close();

        return result;

    }
}
