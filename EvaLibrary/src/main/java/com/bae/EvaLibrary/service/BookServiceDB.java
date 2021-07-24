package com.bae.EvaLibrary.service;

import java.util.List;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.bae.EvaLibrary.data.Book;
import com.bae.EvaLibrary.data.LibraryRepo;

@Service
@Primary
public class BookServiceDB implements BookService {

	private LibraryRepo repo;

	public BookServiceDB(LibraryRepo repo) {
		super();
		this.repo = repo;
	}

	@Override
	public Book createBook(Book book) {
		return this.repo.save(book);
	}

	@Override
	public List<Book> getAllBooks() {
		return this.repo.findAll();
	}

	@Override
	public Book getBook(int id) {
		return this.repo.findById(id).get();
	}

	@Override
	public Book updateBook(int id, Book newBook) {
		Book found = this.repo.getById(id);

		found.setTitle(newBook.getTitle());
		found.setAuthor(newBook.getAuthor());
		found.setPublisher(newBook.getPublisher());

		Book updated = this.repo.save(found);
		return updated;
	}

	@Override
	public String deleteBook(int id) {
		this.repo.deleteById(id);
		return "Deleted: " + id;
	}

}
